/**
 * MailerLite REST client — Edge Runtime compatible (native fetch, no SDK).
 * Uses MailerLite v2 API at connect.mailerlite.com.
 *
 * Required env vars:
 *   MAILERLITE_API_KEY   — API key from MailerLite dashboard
 *   MAILERLITE_GROUP_ID  — Subscriber group/segment ID to assign leads to
 *
 * Custom subscriber fields used:
 *   fit_tier   (string)  — 'strong' | 'good' | 'possible'
 *   fit_score  (number)  — 6–18
 */

import type { LeadPayload } from '@/types'

interface MailerLiteFields {
  name?: string
  fit_tier: string
  fit_score: number
}

interface MailerLiteSubscriberPayload {
  email: string
  fields: MailerLiteFields
  groups: string[]
}

interface MailerLiteErrorBody {
  message?: string
  errors?: Record<string, string[]>
}

function getApiBase(): string {
  return 'https://connect.mailerlite.com/api'
}

/**
 * Adds or updates a subscriber in MailerLite and assigns them to the
 * configured group.
 *
 * - 409 Conflict (subscriber already exists) is treated as success.
 * - All other non-2xx responses throw a descriptive Error.
 */
export async function addToMailerLite(lead: LeadPayload): Promise<void> {
  const apiKey = (process.env.MAILERLITE_API_KEY ?? '').trim()
  const groupId = (process.env.MAILERLITE_GROUP_ID ?? '').trim()

  if (!apiKey) throw new Error('MAILERLITE_API_KEY is not set.')
  if (!groupId) throw new Error('MAILERLITE_GROUP_ID is not set.')

  const fields: MailerLiteFields = {
    fit_tier: lead.fit_tier,
    fit_score: lead.score,
  }
  if (lead.first_name) fields.name = lead.first_name

  const payload: MailerLiteSubscriberPayload = {
    email: lead.email,
    fields,
    groups: [groupId],
  }

  let response: Response
  try {
    response = await fetch(`${getApiBase()}/subscribers`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })
  } catch (err) {
    console.error('[mailerlite] Network error while adding subscriber:', err)
    throw new Error('Failed to reach MailerLite — network error.')
  }

  // 200 = updated existing subscriber, 201 = created new subscriber
  if (response.ok) return

  // 409 = subscriber already exists — treat as success, update fields instead
  if (response.status === 409) {
    console.error(
      `[mailerlite] Subscriber ${lead.email} already exists — skipping (non-fatal).`,
    )
    return
  }

  let detail = `HTTP ${response.status}`
  try {
    const json = (await response.json()) as MailerLiteErrorBody
    if (json.message) detail += `: ${json.message}`
    if (json.errors) {
      const fieldErrors = Object.entries(json.errors)
        .map(([field, msgs]) => `${field}: ${msgs.join(', ')}`)
        .join('; ')
      detail += ` (${fieldErrors})`
    }
  } catch {
    // ignore; use status code only
  }

  console.error(`[mailerlite] Failed to add subscriber ${lead.email}: ${detail}`)
  throw new Error(`MailerLite write failed — ${detail}`)
}

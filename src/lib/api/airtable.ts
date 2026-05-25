/**
 * Airtable REST client — Edge Runtime compatible (native fetch, no SDK).
 *
 * Required env vars:
 *   AIRTABLE_API_KEY    — Personal Access Token (pat_xxxx...)
 *   AIRTABLE_BASE_ID    — Base ID (appXXXXXXXXXXXXXX)
 *   AIRTABLE_TABLE_NAME — Table name (default: "Leads")
 *
 * Airtable table schema:
 *   Email, Timestamp, Score, Tier, Age, Income, Retirement,
 *   Goal, Insurance, Employment, UTM_Source, UTM_Medium,
 *   UTM_Campaign, Status
 */

import type { LeadPayload } from '@/types'

interface AirtableFields {
  Email: string
  Timestamp: string
  Score: number
  Tier: string
  Primary_Concern: string
  Retirement: string
  Goal: string
  Insurance: string
  Income: string
  Age: string
  UTM_Source: string
  UTM_Medium: string
  UTM_Campaign: string
  Status: string
  First_Name?: string
  UTM_Content?: string
  UTM_Term?: string
}

interface AirtableRecord {
  fields: AirtableFields
}

interface AirtableErrorBody {
  error?: { type?: string; message?: string }
}

function buildFields(lead: LeadPayload): AirtableFields {
  const fields: AirtableFields = {
    Email: lead.email,
    Timestamp: lead.timestamp,
    Score: lead.score,
    Tier: lead.fit_tier,
    Primary_Concern: lead.answers.primary_concern,
    Retirement: lead.answers.retirement_contributions,
    Goal: lead.answers.primary_goal,
    Insurance: lead.answers.current_insurance,
    Income: lead.answers.income,
    Age: lead.answers.age_bracket,
    UTM_Source: lead.source,
    UTM_Medium: lead.utm_medium ?? '',
    UTM_Campaign: lead.utm_campaign ?? '',
    Status: 'New',
  }

  if (lead.first_name) fields.First_Name = lead.first_name
  if (lead.utm_content) fields.UTM_Content = lead.utm_content
  if (lead.utm_term) fields.UTM_Term = lead.utm_term

  return fields
}

function getAirtableUrl(): string {
  const baseId = process.env.AIRTABLE_BASE_ID!
  const tableName = encodeURIComponent(process.env.AIRTABLE_TABLE_NAME ?? 'Leads')
  return `https://api.airtable.com/v0/${baseId}/${tableName}`
}

/**
 * Writes a lead record to Airtable.
 * Throws a descriptive Error on any non-2xx response.
 */
export async function addToAirtable(lead: LeadPayload): Promise<void> {
  const url = getAirtableUrl()
  const apiKey = process.env.AIRTABLE_API_KEY!

  const body: AirtableRecord = {
    fields: buildFields(lead),
  }

  let response: Response
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  } catch (err) {
    console.error('[airtable] Network error while writing lead:', err)
    throw new Error('Failed to reach Airtable — network error.')
  }

  if (!response.ok) {
    let detail = `HTTP ${response.status}`
    try {
      const json = (await response.json()) as AirtableErrorBody
      if (json.error?.message) detail += `: ${json.error.message}`
    } catch {
      // ignore parse error; use status code only
    }
    console.error(`[airtable] Write failed for ${lead.email}: ${detail}`)
    throw new Error(`Airtable write failed — ${detail}`)
  }
}

/**
 * POST /api/submit-lead
 *
 * Accepts quiz answers + contact info, scores the lead server-side,
 * writes to Airtable (authoritative), and best-effort syncs to MailerLite.
 *
 * Required env vars:
 *   AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME
 *   MAILERLITE_API_KEY, MAILERLITE_GROUP_ID
 *   RATE_LIMIT_MAX (optional, default: 5)
 *   RATE_LIMIT_WINDOW_MS (optional, default: 60000)
 */

export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { addToAirtable } from '@/lib/api/airtable'
import { addToMailerLite } from '@/lib/api/mailerlite'
import { calculateScore, getTier } from '@/lib/quiz/scoring'
import { rateLimit } from '@/lib/rate-limit'
import type { LeadPayload } from '@/types'
import { submitLeadSchema } from './schema'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function jsonError(error: string, code: string, status: number): NextResponse {
  return NextResponse.json({ success: false, error, code }, { status })
}

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    // x-forwarded-for may be a comma-separated list; take the first (originating) IP
    const first = forwarded.split(',')[0].trim()
    if (first) return first
  }
  return 'unknown'
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  // 1. Rate limiting
  const ip = getClientIp(req)
  if (rateLimit(ip)) {
    return jsonError(
      'Too many requests. Please wait a moment and try again.',
      'RATE_LIMITED',
      429,
    )
  }

  // 2. Parse JSON body
  let rawBody: unknown
  try {
    rawBody = await req.json()
  } catch {
    return jsonError('Invalid request body — expected JSON.', 'BAD_JSON', 400)
  }

  // 3. Validate with Zod
  let input: ReturnType<typeof submitLeadSchema.parse>
  try {
    input = submitLeadSchema.parse(rawBody)
  } catch (err) {
    if (err instanceof ZodError) {
      const firstIssue = err.issues[0]
      const field = firstIssue?.path.join('.') ?? 'unknown'
      const message = firstIssue?.message ?? 'Validation failed.'
      return jsonError(`${field}: ${message}`, 'VALIDATION_ERROR', 422)
    }
    return jsonError('Validation failed. Please check your input.', 'VALIDATION_ERROR', 422)
  }

  // 4. Score server-side (never trust a client-submitted score)
  const score = calculateScore(input.answers)
  const fit_tier = getTier(score)

  // 5. Build LeadPayload
  const lead: LeadPayload = {
    email: input.email,
    first_name: input.first_name,
    timestamp: new Date().toISOString(),
    source: input.utm?.source ?? 'direct',
    utm_medium: input.utm?.medium,
    utm_campaign: input.utm?.campaign,
    utm_content: input.utm?.content,
    utm_term: input.utm?.term,
    answers: input.answers,
    score,
    fit_tier,
  }

  // 6. Write to Airtable — source of truth; fail hard if this fails
  try {
    await addToAirtable(lead)
  } catch (err) {
    console.error('[submit-lead] Airtable write failed:', err)
    return jsonError(
      'We could not save your information right now. Please try again.',
      'STORAGE_ERROR',
      503,
    )
  }

  // 7. Sync to MailerLite — best effort; log but don't fail the request
  const [mailerResult] = await Promise.allSettled([addToMailerLite(lead)])
  if (mailerResult.status === 'rejected') {
    console.error('[submit-lead] MailerLite sync failed (non-fatal):', mailerResult.reason)
  }

  // 8. Success
  return NextResponse.json({ success: true, tier: fit_tier, score }, { status: 200 })
}

// ─── Block other methods ──────────────────────────────────────────────────────

export async function GET(): Promise<NextResponse> {
  return jsonError('Method not allowed.', 'METHOD_NOT_ALLOWED', 405)
}

export async function PUT(): Promise<NextResponse> {
  return jsonError('Method not allowed.', 'METHOD_NOT_ALLOWED', 405)
}

export async function PATCH(): Promise<NextResponse> {
  return jsonError('Method not allowed.', 'METHOD_NOT_ALLOWED', 405)
}

export async function DELETE(): Promise<NextResponse> {
  return jsonError('Method not allowed.', 'METHOD_NOT_ALLOWED', 405)
}

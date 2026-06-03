/**
 * Vercel Analytics custom event helper.
 *
 * Wraps `track()` from @vercel/analytics with a no-op fallback so it's safe
 * to call in any environment (dev, test, SSR) without throwing.
 *
 * Usage:
 *   import { vaTrack } from '@/lib/va'
 *   vaTrack('quiz_started')
 *   vaTrack('quiz_completed', { tier: 'strong', score: 16 })
 *
 * Funnel events:
 *   quiz_started         — user selects an answer on Q1
 *   quiz_email_reached   — user reaches the email gate (completed all questions)
 *   quiz_completed       — email submitted successfully, results shown
 *   privacy_read         — user visits /privacy (auto via Analytics component; custom for dwell)
 */

import { track } from '@vercel/analytics'

export function vaTrack(event: string, properties?: Record<string, string | number | boolean>) {
  try {
    track(event, properties)
  } catch {
    // Silently ignore in environments where Vercel Analytics is not loaded
  }
}

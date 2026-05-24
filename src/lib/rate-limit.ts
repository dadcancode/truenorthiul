/**
 * In-memory sliding-window rate limiter.
 *
 * ⚠️  Works for single-instance deployments (Vercel Hobby, single container).
 *     For multi-region or multi-instance, swap this for a Redis/Upstash store.
 *
 * Required env vars (with defaults):
 *   RATE_LIMIT_MAX        — max requests per window (default: 5)
 *   RATE_LIMIT_WINDOW_MS  — window size in ms     (default: 60000)
 */

interface WindowEntry {
  timestamps: number[]
}

const store = new Map<string, WindowEntry>()

const MAX = parseInt(process.env.RATE_LIMIT_MAX ?? '5', 10)
const WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS ?? '60000', 10)

/** Prune expired entries to keep memory usage bounded. */
function prune(now: number, entry: WindowEntry): void {
  const cutoff = now - WINDOW_MS
  entry.timestamps = entry.timestamps.filter((t) => t > cutoff)
}

/**
 * Check whether the given key is rate-limited.
 *
 * @param key  — typically the client IP address
 * @returns    `true` if the request should be blocked, `false` if allowed
 */
export function rateLimit(key: string): boolean {
  const now = Date.now()

  let entry = store.get(key)
  if (!entry) {
    entry = { timestamps: [] }
    store.set(key, entry)
  }

  prune(now, entry)

  if (entry.timestamps.length >= MAX) {
    return true // limited
  }

  entry.timestamps.push(now)
  return false // allowed
}

/**
 * Returns how many requests the key has made in the current window.
 * Useful for X-RateLimit-* response headers.
 */
export function getRateLimitStatus(key: string): { count: number; max: number; windowMs: number } {
  const now = Date.now()
  const entry = store.get(key)
  if (!entry) return { count: 0, max: MAX, windowMs: WINDOW_MS }

  prune(now, entry)
  return { count: entry.timestamps.length, max: MAX, windowMs: WINDOW_MS }
}

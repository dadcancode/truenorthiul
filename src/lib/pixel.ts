/**
 * Meta Pixel helper — safe wrapper around fbq()
 * Only fires in the browser; no-ops if pixel is not loaded.
 */

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fbq?: (...args: any[]) => void
  }
}

export function pixelTrack(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  if (typeof window.fbq !== 'function') return
  if (params) {
    window.fbq('track', event, params)
  } else {
    window.fbq('track', event)
  }
}

export function pixelCustom(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  if (typeof window.fbq !== 'function') return
  if (params) {
    window.fbq('trackCustom', event, params)
  } else {
    window.fbq('trackCustom', event)
  }
}

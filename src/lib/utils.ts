import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// ─── shadcn/ui standard ──────────────────────────────────────────────────────

/**
 * Merges Tailwind CSS class names, resolving conflicts via tailwind-merge.
 * Standard utility required by shadcn/ui components.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

// ─── String helpers ──────────────────────────────────────────────────────────

/**
 * Sanitizes an email address: trims whitespace and lowercases.
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

/**
 * Capitalizes the first letter of a string.
 */
export function capitalize(str: string): string {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// ─── Response helpers ────────────────────────────────────────────────────────

/**
 * Creates a standard JSON error response body.
 */
export function errorResponse(error: string, code: string): { success: false; error: string; code: string } {
  return { success: false, error, code }
}

// ─── Environment helpers ─────────────────────────────────────────────────────

/**
 * Returns the current app environment label.
 * Falls back to 'production' when NEXT_PUBLIC_APP_ENV is not set.
 */
export function getAppEnv(): string {
  return process.env.NEXT_PUBLIC_APP_ENV ?? 'production'
}

/**
 * Returns true when running in development mode.
 */
export function isDev(): boolean {
  return getAppEnv() === 'development'
}

// ─── UTM helpers ─────────────────────────────────────────────────────────────

/**
 * Extracts a safe string from a URLSearchParams entry.
 * Returns undefined instead of null to simplify optional field handling.
 */
export function getUtmParam(params: URLSearchParams, key: string): string | undefined {
  return params.get(key) ?? undefined
}

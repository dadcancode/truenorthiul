'use client'

import { useState, useRef, useEffect } from 'react'

interface EmailGateProps {
  onSubmit: (email: string, firstName?: string) => void
  onBack: () => void
  submitting: boolean
  error: string | null
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export default function EmailGate({ onSubmit, onBack, submitting, error }: EmailGateProps) {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [touched, setTouched] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  const emailError = touched && !isValidEmail(email)
    ? 'Please enter a valid email address.'
    : null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!isValidEmail(email)) return
    onSubmit(email.trim(), firstName.trim() || undefined)
  }

  return (
    <div>
      {/* Back */}
      <button
        onClick={onBack}
        className="btn-secondary mb-5 flex items-center gap-1.5"
        style={{ padding: '0.375rem 0.875rem', fontSize: '0.875rem' }}
        aria-label="Go back"
        disabled={submitting}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M9 11L5 7L9 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back
      </button>

      {/* Headline */}
      <h2
        ref={headingRef}
        className="font-display text-2xl text-brand-navy-900 mb-2 focus:outline-none"
        tabIndex={-1}
      >
        Your personalized IUL fit report is ready.
      </h2>
      <p className="text-neutral-600 mb-6">Enter your email to see your results.</p>

      {/* API error */}
      {error && (
        <div
          className="mb-4 px-4 py-3 rounded-lg bg-semantic-error-bg border border-semantic-error text-semantic-error text-sm"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* First name (optional) */}
        <div className="mb-4">
          <label htmlFor="first-name" className="form-label">
            First name <span className="text-neutral-400 font-normal">(optional)</span>
          </label>
          <input
            id="first-name"
            type="text"
            autoComplete="given-name"
            className="form-input"
            placeholder="Jane"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={submitting}
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label htmlFor="email" className="form-label">
            Email address <span className="text-semantic-error" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-describedby={emailError ? 'email-error' : undefined}
            aria-invalid={emailError ? 'true' : 'false'}
            className={`form-input ${emailError ? 'error' : ''}`}
            placeholder="jane@example.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setTouched(false) }}
            onBlur={() => setTouched(true)}
            disabled={submitting}
          />
          {emailError && (
            <p id="email-error" className="form-error" role="alert">
              {emailError}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn-primary btn-primary-full"
          disabled={submitting}
          aria-busy={submitting}
        >
          {submitting ? (
            <span className="flex items-center justify-center gap-2">
              <span className="spinner spinner-white" aria-hidden="true" />
              Submitting…
            </span>
          ) : (
            'See My Results →'
          )}
        </button>

        <p className="text-center text-xs text-neutral-400 mt-3">
          By submitting, you agree a licensed IUL specialist may follow up about your results.
          No spam. Unsubscribe anytime.
        </p>
      </form>
    </div>
  )
}

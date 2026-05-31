'use client'

import { useReducer, useEffect, useRef, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { QuizAnswers, FitTier } from '@/types'
import QuizProgress from './QuizProgress'
import QuizStep from './QuizStep'
import EmailGate from './EmailGate'
import { pixelTrack, pixelCustom } from '@/lib/pixel'

// ─── Quiz questions ────────────────────────────────────────────────────────

const QUIZ_QUESTIONS: Array<{
  id: keyof QuizAnswers
  question: string
  subtext?: string
  options: Array<{ value: string; label: string }>
}> = [
  {
    id: 'primary_concern',
    question: "What's your biggest money concern right now?",
    options: [
      { value: 'not_saving_enough', label: "I'm not saving enough for retirement" },
      { value: 'family_protection', label: 'I worry about what happens to my family if something happens to me' },
      { value: 'too_much_tax', label: 'I pay too much in taxes and want a better strategy' },
      { value: 'want_safe_growth', label: 'I want my money to grow, but I can\'t afford to lose it in a downturn' },
    ],
  },
  {
    id: 'retirement_contributions',
    question: 'How would you describe your retirement savings right now?',
    options: [
      { value: 'not_started', label: "I haven't really started yet" },
      { value: 'contributing', label: "I'm saving something, but not consistently" },
      { value: 'contributing_regularly', label: "I'm contributing regularly through work or an IRA" },
      { value: 'maxed_out', label: "I've maxed out my tax-advantaged accounts and have more to save" },
    ],
  },
  {
    id: 'primary_goal',
    question: 'When you picture retirement, what matters most?',
    options: [
      { value: 'tax_free_income', label: 'Tax-free income I can count on every year' },
      { value: 'family_protection', label: 'Knowing my family is protected if I die before I retire' },
      { value: 'both', label: 'Both — I want growth and protection in one place' },
      { value: 'build_wealth_first', label: "I'm focused on building wealth first; retirement planning can come later" },
    ],
  },
  {
    id: 'current_insurance',
    question: "What's your current life insurance situation?",
    options: [
      { value: 'none', label: 'I have no life insurance' },
      { value: 'term', label: 'I have term life — it covers me until a certain age' },
      { value: 'permanent', label: 'I have permanent life insurance (whole life or universal)' },
      { value: 'employer_only', label: 'I rely on what my employer provides' },
    ],
  },
  {
    id: 'income',
    question: "What's your annual household income?",
    options: [
      { value: 'under_50k', label: 'Under $50,000' },
      { value: '50_100k', label: '$50,000 – $100,000' },
      { value: '100_200k', label: '$100,000 – $200,000' },
      { value: '200k_plus', label: 'Over $200,000' },
    ],
  },
  {
    id: 'age_bracket',
    question: 'Last one — how old are you?',
    options: [
      { value: 'under_30', label: 'Under 30' },
      { value: '30_45', label: '30 – 45' },
      { value: '45_55', label: '45 – 55' },
      { value: '55_plus', label: '55 or older' },
    ],
  },
]

const TOTAL_QUESTIONS = QUIZ_QUESTIONS.length  // 6
// step 0-5 = questions, 6 = email gate, 7 = submitting, 8 = error

// ─── State machine ─────────────────────────────────────────────────────────

interface UTMParams {
  source?: string
  medium?: string
  campaign?: string
  content?: string
  term?: string
}

interface QuizState {
  step: number
  answers: Partial<QuizAnswers>
  email: string
  firstName: string
  direction: 'forward' | 'backward'
  error: string | null
  submitting: boolean
  utm: UTMParams
  animating: boolean
}

type QuizAction =
  | { type: 'SELECT_ANSWER'; question: keyof QuizAnswers; value: string }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_EMAIL'; email: string; firstName?: string }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS'; tier: FitTier; score: number }
  | { type: 'SUBMIT_ERROR'; error: string }
  | { type: 'RETRY' }
  | { type: 'SET_UTM'; utm: UTMParams }
  | { type: 'ANIMATION_DONE' }

const initialState: QuizState = {
  step: 0,
  answers: {},
  email: '',
  firstName: '',
  direction: 'forward',
  error: null,
  submitting: false,
  utm: {},
  animating: false,
}

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'SELECT_ANSWER':
      return {
        ...state,
        answers: { ...state.answers, [action.question]: action.value },
      }
    case 'NEXT_STEP':
      return {
        ...state,
        step: Math.min(state.step + 1, TOTAL_QUESTIONS),
        direction: 'forward',
        animating: true,
      }
    case 'PREV_STEP':
      return {
        ...state,
        step: Math.max(state.step - 1, 0),
        direction: 'backward',
        animating: true,
      }
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.email,
        firstName: action.firstName ?? state.firstName,
      }
    case 'SUBMIT_START':
      return { ...state, submitting: true, error: null, step: 7 }
    case 'SUBMIT_SUCCESS':
      return { ...state, submitting: false }
    case 'SUBMIT_ERROR':
      return { ...state, submitting: false, error: action.error, step: 6 }
    case 'RETRY':
      return { ...state, error: null, step: 6 }
    case 'SET_UTM':
      return { ...state, utm: action.utm }
    case 'ANIMATION_DONE':
      return { ...state, animating: false }
    default:
      return state
  }
}

// ─── Component ─────────────────────────────────────────────────────────────

export default function QuizShell() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [state, dispatch] = useReducer(quizReducer, initialState)
  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  // Fire Meta Pixel ViewContent on quiz load
  useEffect(() => {
    pixelTrack('ViewContent', { content_name: 'IUL Quiz' })
  }, [])

  // Capture UTM params on mount
  useEffect(() => {
    const utm: UTMParams = {}
    const src = searchParams.get('utm_source')
    const medium = searchParams.get('utm_medium')
    const campaign = searchParams.get('utm_campaign')
    const content = searchParams.get('utm_content')
    const term = searchParams.get('utm_term')
    if (src) utm.source = src
    if (medium) utm.medium = medium
    if (campaign) utm.campaign = campaign
    if (content) utm.content = content
    if (term) utm.term = term
    if (Object.keys(utm).length > 0) {
      dispatch({ type: 'SET_UTM', utm })
    }
  }, [searchParams])

  // Fire pixel event when email gate appears
  useEffect(() => {
    if (state.step === TOTAL_QUESTIONS) {
      pixelCustom('quiz_email_reached')
    }
  }, [state.step])

  // Handle answer selection with auto-advance
  const handleSelectAnswer = useCallback(
    (question: keyof QuizAnswers, value: string) => {
      dispatch({ type: 'SELECT_ANSWER', question, value })

      // Fire quiz_started on first answer only
      if (state.step === 0) {
        pixelCustom('quiz_started')
      }

      // Clear any pending timer
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current)

      // Auto-advance after 300ms visual feedback delay
      autoAdvanceTimer.current = setTimeout(() => {
        dispatch({ type: 'NEXT_STEP' })
      }, 300)
    },
    [state.step]
  )

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current)
    }
  }, [])

  // Reset animation flag after animation completes
  useEffect(() => {
    if (state.animating) {
      const t = setTimeout(() => dispatch({ type: 'ANIMATION_DONE' }), 300)
      return () => clearTimeout(t)
    }
  }, [state.animating, state.step])

  const handleSubmit = useCallback(
    async (email: string, firstName?: string) => {
      dispatch({ type: 'SET_EMAIL', email, firstName })
      dispatch({ type: 'SUBMIT_START' })

      try {
        const body = {
          email,
          first_name: firstName,
          answers: state.answers as QuizAnswers,
          utm: Object.keys(state.utm).length > 0 ? state.utm : undefined,
        }

        const res = await fetch('/api/submit-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })

        const data = (await res.json()) as {
          success: boolean
          tier?: FitTier
          score?: number
          error?: string
          code?: string
        }

        if (!data.success || !data.tier || data.score === undefined) {
          dispatch({
            type: 'SUBMIT_ERROR',
            error: data.error ?? 'Something went wrong. Please try again.',
          })
          return
        }

        // Fire Meta Pixel Lead event
        pixelTrack('Lead')
        // Fire custom completion event for funnel analysis
        pixelCustom('quiz_completed', { fit_tier: data.tier, score: data.score })

        dispatch({ type: 'SUBMIT_SUCCESS', tier: data.tier, score: data.score })
        router.push(`/results?tier=${data.tier}&score=${data.score}`)
      } catch {
        dispatch({
          type: 'SUBMIT_ERROR',
          error: 'Network error. Please check your connection and try again.',
        })
      }
    },
    [state.answers, state.utm, router]
  )

  const currentQuestion = state.step < TOTAL_QUESTIONS ? QUIZ_QUESTIONS[state.step] : null

  // Determine animation class
  const animClass = state.animating
    ? state.direction === 'forward'
      ? 'quiz-step-enter'
      : 'quiz-step-enter-back'
    : ''

  // ── Render: Loading / Submitting ──
  if (state.step === 7) {
    return (
      <div className="quiz-card text-center py-12 animate-fade-in">
        <div className="spinner mx-auto mb-4" style={{ width: '2.5rem', height: '2.5rem', borderWidth: '3px' }} aria-hidden="true" />
        <p className="font-semibold text-brand-navy-900 text-lg mb-1">Analyzing your answers…</p>
        <p className="text-neutral-500 text-sm">Calculating your personalized IUL fit score.</p>
      </div>
    )
  }

  return (
    <div>
      {/* Progress bar — show during questions and email gate */}
      {state.step < TOTAL_QUESTIONS + 1 && (
        <QuizProgress
          currentStep={state.step}
          totalQuestions={TOTAL_QUESTIONS}
        />
      )}

      {/* Quiz card */}
      <div ref={cardRef} className={`quiz-card ${animClass}`} key={state.step}>
        {/* Questions 0–5 */}
        {currentQuestion && (
          <QuizStep
            question={currentQuestion.question}
            options={currentQuestion.options}
            selectedValue={state.answers[currentQuestion.id] as string | undefined}
            onSelect={(value) => handleSelectAnswer(currentQuestion.id, value)}
            onNext={() => dispatch({ type: 'NEXT_STEP' })}
            onBack={() => dispatch({ type: 'PREV_STEP' })}
            showBack={state.step > 0}
            questionIndex={state.step}
          />
        )}

        {/* Email gate — step 6 */}
        {state.step === TOTAL_QUESTIONS && (
          <EmailGate
            onSubmit={handleSubmit}
            onBack={() => dispatch({ type: 'PREV_STEP' })}
            submitting={state.submitting}
            error={state.error}
          />
        )}
      </div>
    </div>
  )
}

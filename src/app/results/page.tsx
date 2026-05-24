import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { FitTier } from '@/types'
import ScoreCounter from '@/components/results/ScoreCounter'

export const metadata: Metadata = {
  title: 'Your IUL Fit Score — TrueNorth IUL',
  description: 'See your personalized IUL fit report.',
}

const VALID_TIERS: FitTier[] = ['strong', 'good', 'possible']
const MAX_SCORE = 18

const TIER_COPY: Record<
  FitTier,
  {
    headline: string
    subhead: string
    badge: string
    badgeClass: string
    points: string[]
    ctaHeadline: string
    ctaBody: string
    ctaButton: string
  }
> = {
  strong: {
    headline: "You're a Strong Fit for an IUL",
    subhead:
      'Based on your profile, an Indexed Universal Life policy could be a powerful addition to your retirement strategy.',
    badge: 'Strong Fit',
    badgeClass: 'bg-brand-gold-100 text-brand-gold-600 border border-brand-gold-500',
    points: [
      'Your income and contribution level make you an ideal candidate for tax-advantaged IUL growth',
      "IUL's downside protection aligns well with your current retirement stage",
      'Your employment type may offer additional IUL structuring advantages',
    ],
    ctaHeadline: 'What Makes an IUL a Strong Fit?',
    ctaBody:
      "People with your profile often find IUL most powerful as a complement to maxed-out tax-advantaged accounts. Here's what to research next.",
    ctaButton: 'Learn How IUL Works →',
  },
  good: {
    headline: 'An IUL Could Work Well for You',
    subhead:
      'Your profile shows several factors that align with IUL — the details matter, and understanding the product is a smart first step.',
    badge: 'Good Fit',
    badgeClass: 'bg-brand-teal-100 text-brand-teal-700 border border-brand-teal-500',
    points: [
      'IULs tend to work best when contributions are consistent over time',
      'Your financial goals align well with the tax-free income IULs can provide',
      'Understanding how IUL complements or replaces existing coverage is a key next step',
    ],
    ctaHeadline: 'Understanding Your IUL Options',
    ctaBody:
      'IULs work best when structured early and funded consistently. Read up on how the crediting strategy and cost of insurance interact over time.',
    ctaButton: 'Explore IUL Basics →',
  },
  possible: {
    headline: 'An IUL Might Be Worth Exploring',
    subhead:
      "Based on your current profile, an IUL isn't an obvious slam dunk — but there may be specific use cases worth understanding.",
    badge: 'Exploratory Fit',
    badgeClass: 'bg-neutral-100 text-neutral-700 border border-neutral-300',
    points: [
      'IULs are typically best for those with higher disposable income for consistent premiums',
      'Your situation may benefit more from foundational retirement accounts first',
      "That said, IUL has use cases across many income levels — learning the basics never hurts",
    ],
    ctaHeadline: 'Keep Learning Before You Decide',
    ctaBody:
      'Understanding the basics of IUL — how premiums, cost of insurance, and indexed crediting interact — is a smart first step before any decision.',
    ctaButton: 'Read the IUL Overview →',
  },
}

interface ResultsPageProps {
  searchParams: { tier?: string; score?: string }
}

export default function ResultsPage({ searchParams }: ResultsPageProps) {
  const { tier: tierParam, score: scoreParam } = searchParams

  // Validate params — redirect if invalid
  if (!tierParam || !scoreParam) redirect('/quiz')
  if (!VALID_TIERS.includes(tierParam as FitTier)) redirect('/quiz')

  const score = parseInt(scoreParam, 10)
  if (isNaN(score) || score < 6 || score > MAX_SCORE) redirect('/quiz')

  const tier = tierParam as FitTier
  const copy = TIER_COPY[tier]

  return (
    <>
      {/* ─── Results Hero ─── */}
      <section className="results-hero" aria-labelledby="results-headline">
        <div className="max-w-results mx-auto text-center">
          {/* Tier badge */}
          <div className="results-item-1 flex justify-center mb-4">
            <span className={`score-badge ${copy.badgeClass}`} aria-label={`Fit tier: ${copy.badge}`}>
              {copy.badge}
            </span>
          </div>

          {/* Score display */}
          <div className="results-item-2 mb-6">
            <p className="text-sm font-medium text-neutral-500 mb-1">Your Score</p>
            <ScoreCounter score={score} maxScore={MAX_SCORE} />
          </div>

          {/* Headline */}
          <h1 id="results-headline" className="results-item-3 font-display text-4xl md:text-5xl text-brand-navy-900 mb-4 text-balance">
            {copy.headline}
          </h1>
          <p className="results-item-4 text-xl text-neutral-600 text-balance max-w-xl mx-auto">
            {copy.subhead}
          </p>
        </div>
      </section>

      {/* ─── Detail points ─── */}
      <section className="py-12 px-4 bg-white" aria-label="Your results details">
        <div className="max-w-results mx-auto">
          <h2 className="results-item-5 font-semibold text-xl text-brand-navy-900 mb-5">
            What this means for you
          </h2>
          <ul className="space-y-4" role="list">
            {copy.points.map((point, i) => (
              <li key={i} className={`result-point results-item-${i + 5}`}>
                <span className="result-point-icon" aria-hidden="true">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── CTA card ─── */}
      <section className="py-12 px-4 bg-neutral-50" aria-label="Learn more">
        <div className="max-w-results mx-auto">
          <div className="cta-dark results-item-8">
            <h2 className="font-display text-2xl text-white mb-3">{copy.ctaHeadline}</h2>
            <p className="text-brand-navy-100 text-base mb-6 text-balance">{copy.ctaBody}</p>
            <Link href="/about" className="btn-primary">
              {copy.ctaButton}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Retake quiz ─── */}
      <section className="py-8 px-4 text-center bg-white" aria-label="Take quiz again">
        <p className="text-neutral-500 text-sm mb-2">Want to try different answers?</p>
        <Link href="/quiz" className="btn-secondary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.875rem' }}>
          Retake the Quiz
        </Link>
      </section>

      {/* ─── Disclaimer ─── */}
      <div className="px-4 py-6 bg-white border-t border-neutral-100">
        <p className="text-xs text-neutral-400 text-center max-w-2xl mx-auto leading-relaxed">
          This score is for educational purposes only. It is not financial, tax, or insurance advice.
          Individual circumstances vary widely. Consult a licensed financial or insurance professional
          before making any product decisions. TrueNorth IUL does not sell insurance products.
        </p>
      </div>
    </>
  )
}

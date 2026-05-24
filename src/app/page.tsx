import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TrueNorth IUL — Is an IUL Right for You?',
}

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Take the Quiz',
    desc: 'Answer 6 quick questions about your age, income, and financial goals.',
  },
  {
    step: '2',
    title: 'Get Your Score',
    desc: 'Our algorithm calculates a personalized IUL fit score based on your profile.',
  },
  {
    step: '3',
    title: 'Learn What It Means',
    desc: 'Get a plain-English explanation of how an IUL could — or couldn\'t — work for you.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="hero-section" aria-labelledby="hero-headline">
        <div className="max-w-content mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal-50 border border-brand-teal-200 mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-teal-600 inline-block" aria-hidden="true" />
            <span className="text-sm font-medium text-brand-teal-700">Free • Takes under 2 minutes</span>
          </div>

          <h1
            id="hero-headline"
            className="font-display text-5xl md:text-6xl text-brand-navy-900 text-balance mb-5"
          >
            Find Out If an IUL Is{' '}
            <span className="italic">Right for You</span>
            {' '}— In Under 2 Minutes
          </h1>

          <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-8 text-balance">
            Answer 6 quick questions and get a personalized fit report. No obligation, no spam.
          </p>

          <Link href="/quiz" className="btn-primary btn-primary-lg inline-flex">
            Take the Free Quiz →
          </Link>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8">
            <span className="trust-signal">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1L8.545 5.09H13L9.727 7.545L11.273 11.636L7 9.182L2.727 11.636L4.273 7.545L1 5.09H5.455L7 1Z" fill="#0D9488"/>
              </svg>
              Educational content only
            </span>
            <span className="text-neutral-300 hidden sm:inline" aria-hidden="true">·</span>
            <span className="trust-signal">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1L8.545 5.09H13L9.727 7.545L11.273 11.636L7 9.182L2.727 11.636L4.273 7.545L1 5.09H5.455L7 1Z" fill="#0D9488"/>
              </svg>
              No selling
            </span>
            <span className="text-neutral-300 hidden sm:inline" aria-hidden="true">·</span>
            <span className="trust-signal">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1L8.545 5.09H13L9.727 7.545L11.273 11.636L7 9.182L2.727 11.636L4.273 7.545L1 5.09H5.455L7 1Z" fill="#0D9488"/>
              </svg>
              Your data is secure
            </span>
          </div>
        </div>
      </section>

      {/* ─── Quiz Preview Teaser ─── */}
      <section className="py-12 px-4 bg-white" aria-label="Quiz preview">
        <div className="max-w-quiz mx-auto">
          <div className="relative">
            <div className="quiz-card opacity-60 blur-[1px] pointer-events-none select-none" aria-hidden="true">
              <p className="quiz-question">How old are you?</p>
              <div className="space-y-2.5">
                {['Under 30', '30 – 45', '45 – 55', '55 or older'].map((label) => (
                  <div key={label} className="answer-option">
                    <span className="radio-indicator" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Overlay CTA */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-white via-white/80 to-transparent rounded-2xl">
              <p className="text-brand-navy-900 font-semibold text-lg mb-3">Ready to see your fit score?</p>
              <Link href="/quiz" className="btn-primary">
                Start the Free Quiz →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="py-20 px-4 bg-neutral-50" aria-labelledby="how-it-works-heading">
        <div className="max-w-page mx-auto">
          <div className="text-center mb-12">
            <h2 id="how-it-works-heading" className="font-display text-3xl text-brand-navy-900 mb-3">
              How It Works
            </h2>
            <p className="text-neutral-600 text-lg">Simple, fast, and completely free.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-brand-navy-900 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-xl text-brand-navy-900 mb-2">{item.title}</h3>
                <p className="text-neutral-600 text-base leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="py-16 px-4 bg-white text-center" aria-labelledby="bottom-cta-heading">
        <div className="max-w-content mx-auto">
          <h2 id="bottom-cta-heading" className="font-display text-3xl md:text-4xl text-brand-navy-900 mb-4 text-balance">
            Understand Your Options Before You Decide
          </h2>
          <p className="text-neutral-600 text-lg mb-8 text-balance">
            An IUL isn&apos;t right for everyone. Our quiz helps you understand whether it fits
            your situation — with zero pressure.
          </p>
          <Link href="/quiz" className="btn-primary btn-primary-lg inline-flex">
            Take the Free Quiz →
          </Link>
          <p className="text-neutral-400 text-sm mt-4">
            6 questions · 2 minutes · Instant results
          </p>
        </div>
      </section>
    </>
  )
}

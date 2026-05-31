import type { Metadata } from 'next'
import { Suspense } from 'react'
import QuizShell from '@/components/quiz/QuizShell'
import QuizErrorBoundary from '@/components/quiz/QuizErrorBoundary'

export const metadata: Metadata = {
  title: 'IUL Fit Quiz — TrueNorth IUL',
  description: 'Answer 6 questions and get your personalized IUL fit score.',
}

export default function QuizPage() {
  return (
    <section className="min-h-[calc(100vh-4rem)] bg-neutral-50 py-8 px-4" aria-labelledby="quiz-heading">
      <div className="max-w-quiz mx-auto">
        {/* Headline mirrors ad promise — bridges the click → page expectation gap */}
        <div className="text-center mb-6">
          <h1 id="quiz-heading" className="font-display text-2xl md:text-3xl text-brand-navy-900 mb-1">
            Get Your Free IUL Fit Report
          </h1>
          <p className="text-neutral-500 text-sm">6 questions · 2 minutes · No advisor pitch</p>
        </div>
        <QuizErrorBoundary>
          <Suspense
            fallback={
              <div className="quiz-card">
                <div className="skeleton h-6 w-1/3 mb-4 rounded" />
                <div className="skeleton h-4 w-full mb-6 rounded" />
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="skeleton h-14 w-full mb-3 rounded-md" />
                ))}
              </div>
            }
          >
            <QuizShell />
          </Suspense>
        </QuizErrorBoundary>
      </div>
    </section>
  )
}

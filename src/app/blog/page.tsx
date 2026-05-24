import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'IUL Education Hub — TrueNorth IUL',
  description: 'In-depth guides, comparisons, and real talk about Indexed Universal Life insurance.',
}

export default function BlogPage() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 text-center bg-neutral-50" aria-labelledby="blog-heading">
      <div className="max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-brand-navy-50 flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 014 17V4.5A2.5 2.5 0 016.5 2H20v17.5M4 19.5V21.5" stroke="#0F2240" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 7h6M9 11h4" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>

        <h1 id="blog-heading" className="font-display text-4xl text-brand-navy-900 mb-4">
          IUL Education Hub
        </h1>
        <p className="text-2xl text-brand-teal-600 font-semibold mb-4">Coming Soon</p>
        <p className="text-neutral-600 text-lg mb-8 text-balance">
          In-depth guides, comparisons, and real talk about Indexed Universal Life insurance.
          Check back soon.
        </p>

        <p className="text-neutral-500 text-sm mb-4">In the meantime:</p>
        <Link href="/quiz" className="btn-primary btn-primary-lg inline-flex">
          Take the Free Quiz →
        </Link>
        <p className="text-neutral-400 text-sm mt-3">
          6 questions · 2 minutes · Instant results
        </p>
      </div>
    </section>
  )
}

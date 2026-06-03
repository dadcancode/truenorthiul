import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — TrueNorth IUL',
  description: 'How TrueNorth IUL collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="py-12 px-4 bg-white min-h-screen">
      <div className="max-w-results mx-auto">
        <header className="mb-10">
          <h1 className="font-display text-4xl text-brand-navy-900 mb-2">Privacy Policy</h1>
          <p className="text-neutral-500 text-sm">Last updated: June 2026</p>
        </header>

        <div className="space-y-10 text-neutral-700 text-base leading-relaxed">

          <section aria-labelledby="data-collect">
            <h2 id="data-collect" className="font-semibold text-xl text-brand-navy-900 mb-3">
              1. What We Collect
            </h2>
            <p className="mb-3">When you take the TrueNorth IUL quiz, we collect:</p>
            <ul className="list-disc list-inside space-y-1.5 text-neutral-600">
              <li><strong>Email address</strong> — to deliver your results</li>
              <li><strong>First name</strong> — optional, used to personalize your results</li>
              <li><strong>Quiz answers</strong> — age bracket, income range, goals, and similar financial context questions</li>
            </ul>
            <p className="mt-3">
              We do <strong>not</strong> collect Social Security numbers, financial account numbers,
              or any sensitive personal information.
            </p>
          </section>

          <section aria-labelledby="data-use">
            <h2 id="data-use" className="font-semibold text-xl text-brand-navy-900 mb-3">
              2. How We Use It
            </h2>
            <ul className="list-disc list-inside space-y-1.5 text-neutral-600">
              <li><strong>Results</strong> — your quiz score is computed instantly and shown to you</li>
              <li><strong>Educational emails</strong> — we may send follow-up content about IUL and financial planning. You can unsubscribe at any time.</li>
              <li><strong>Site improvement</strong> — anonymous analytics help us understand how the site is used</li>
            </ul>
            <p className="mt-3">
              We do <strong>not</strong> sell your personal information to third parties.
            </p>
          </section>

          <section aria-labelledby="data-sharing">
            <h2 id="data-sharing" className="font-semibold text-xl text-brand-navy-900 mb-3">
              3. Services We Use
            </h2>
            <p>
              We use a small number of trusted services to operate this site: a database to store quiz
              responses, an email platform to send your results, and analytics tools to understand site
              traffic. These providers are contractually prohibited from using your data for their own
              purposes.
            </p>
          </section>

          <section aria-labelledby="user-rights">
            <h2 id="user-rights" className="font-semibold text-xl text-brand-navy-900 mb-3">
              4. Your Rights
            </h2>
            <p className="mb-3">You can request to:</p>
            <ul className="list-disc list-inside space-y-1.5 text-neutral-600">
              <li><strong>Access</strong> — see the data we hold about you</li>
              <li><strong>Correction</strong> — fix any inaccurate data</li>
              <li><strong>Deletion</strong> — have your data removed from our systems</li>
              <li><strong>Unsubscribe</strong> — opt out of emails via the link in any email we send</li>
            </ul>
            <p className="mt-3">
              Email us at{' '}
              <Link href="mailto:privacy@truenorthiul.com" className="text-brand-teal-600 underline underline-offset-2">
                privacy@truenorthiul.com
              </Link>
              {' '}and we&apos;ll respond within 30 days.
            </p>
          </section>

          <section aria-labelledby="contact">
            <h2 id="contact" className="font-semibold text-xl text-brand-navy-900 mb-3">
              5. Contact
            </h2>
            <div className="mt-3 p-4 bg-neutral-50 rounded-lg border border-neutral-200 text-sm">
              <p className="font-semibold text-brand-navy-900">TrueNorth IUL</p>
              <p>Fort Worth, TX</p>
              <p>
                <Link href="mailto:privacy@truenorthiul.com" className="text-brand-teal-600 underline underline-offset-2">
                  privacy@truenorthiul.com
                </Link>
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}

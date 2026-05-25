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
          <p className="text-neutral-500 text-sm">Last updated: May 2026</p>
        </header>

        <div className="space-y-10 text-neutral-700 text-base leading-relaxed">

          <section aria-labelledby="data-collect">
            <h2 id="data-collect" className="font-semibold text-xl text-brand-navy-900 mb-3">
              1. What Data We Collect
            </h2>
            <p className="mb-3">When you use the TrueNorth IUL quiz, we may collect:</p>
            <ul className="list-disc list-inside space-y-1.5 text-neutral-600">
              <li><strong>Email address</strong> — required to deliver your results report</li>
              <li><strong>First name</strong> — optional, used for personalization</li>
              <li><strong>Quiz answers</strong> — age bracket, income range, retirement contributions, primary goal, current insurance status, and employment type</li>
              <li><strong>UTM parameters</strong> — marketing attribution data (e.g., utm_source, utm_medium, utm_campaign)</li>
              <li><strong>Analytics data</strong> — page views, quiz completion events, and session data via Google Analytics 4</li>
            </ul>
            <p className="mt-3">
              We do <strong>not</strong> collect Social Security numbers, financial account details,
              or any sensitive personal information.
            </p>
          </section>

          <section aria-labelledby="data-use">
            <h2 id="data-use" className="font-semibold text-xl text-brand-navy-900 mb-3">
              2. How We Use Your Data
            </h2>
            <ul className="list-disc list-inside space-y-1.5 text-neutral-600">
              <li><strong>Delivering results</strong> — your quiz score and tier are computed immediately and shown to you</li>
              <li><strong>Email nurture</strong> — we may send educational content about IUL, financial planning, and related topics based on your quiz results</li>
              <li><strong>Analytics</strong> — to understand how visitors use the site and improve the experience</li>
              <li><strong>Advisor matching</strong> — by submitting your quiz results, you agree that a licensed insurance professional may contact you to discuss your results and IUL options.</li>
            </ul>
          </section>

          <section aria-labelledby="third-party">
            <h2 id="third-party" className="font-semibold text-xl text-brand-navy-900 mb-3">
              3. Third-Party Processors
            </h2>
            <p className="mb-3">We share data with the following service providers to operate TrueNorth IUL:</p>
            <div className="space-y-3">
              {[
                { name: 'Airtable', use: 'Stores your quiz responses and contact information as our backend database.' },
                { name: 'MailerLite', use: 'Manages our email subscriber list and delivers email communications.' },
                { name: 'Google Analytics 4', use: 'Website analytics. Uses cookies. Data may be processed in the United States.' },
                { name: 'Vercel', use: 'Hosts this website. Vercel Analytics may collect cookieless, privacy-friendly visit data.' },
              ].map((p) => (
                <div key={p.name} className="pl-4 border-l-2 border-brand-teal-200">
                  <p><strong className="text-brand-navy-900">{p.name}</strong> — {p.use}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-neutral-500">
              Each processor operates under their own privacy policy and applicable data protection agreements.
            </p>
          </section>

          <section aria-labelledby="retention">
            <h2 id="retention" className="font-semibold text-xl text-brand-navy-900 mb-3">
              4. Data Retention
            </h2>
            <p>
              We retain your personal data for <strong>3 years</strong> from the date of collection,
              or until you unsubscribe from our email list — whichever comes first. You may request
              deletion at any time (see Section 5).
            </p>
          </section>

          <section aria-labelledby="user-rights">
            <h2 id="user-rights" className="font-semibold text-xl text-brand-navy-900 mb-3">
              5. Your Rights
            </h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc list-inside space-y-1.5 text-neutral-600">
              <li><strong>Access</strong> — request a copy of the data we hold about you</li>
              <li><strong>Correction</strong> — request we correct inaccurate data</li>
              <li><strong>Deletion</strong> — request we delete your data from our systems</li>
              <li><strong>Unsubscribe</strong> — opt out of email communications at any time via the unsubscribe link in any email</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email us at{' '}
              <Link href="mailto:privacy@truenorthiul.com" className="text-brand-teal-600 underline underline-offset-2">
                privacy@truenorthiul.com
              </Link>
              . We will respond within 30 days.
            </p>
          </section>

          <section aria-labelledby="ccpa">
            <h2 id="ccpa" className="font-semibold text-xl text-brand-navy-900 mb-3">
              6. CCPA Notice (California Residents)
            </h2>
            <p>
              TrueNorth IUL does <strong>not sell your personal information</strong> to third parties.
              California residents have additional rights under the California Consumer Privacy Act (CCPA),
              including the right to know, delete, and opt out of sale. To submit a request, contact us
              at{' '}
              <Link href="mailto:privacy@truenorthiul.com" className="text-brand-teal-600 underline underline-offset-2">
                privacy@truenorthiul.com
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="cookies">
            <h2 id="cookies" className="font-semibold text-xl text-brand-navy-900 mb-3">
              7. Cookies &amp; Tracking
            </h2>
            <p className="mb-3">
              <strong>Google Analytics 4</strong> uses cookies to track user sessions and behavior.
              These cookies are set by Google and may be used to measure traffic and improve the site.
              You can opt out of GA4 tracking via the{' '}
              <Link href="https://tools.google.com/dlpage/gaoptout" className="text-brand-teal-600 underline underline-offset-2" target="_blank" rel="noopener noreferrer">
                Google Analytics opt-out browser add-on
              </Link>
              .
            </p>
            <p>
              <strong>Vercel Analytics</strong> is cookieless and does not track individual users
              across sessions or sites.
            </p>
          </section>

          <section aria-labelledby="contact">
            <h2 id="contact" className="font-semibold text-xl text-brand-navy-900 mb-3">
              8. Contact
            </h2>
            <p>
              For privacy-related questions or requests, contact us at:
            </p>
            <div className="mt-3 p-4 bg-neutral-50 rounded-lg border border-neutral-200 text-sm">
              <p className="font-semibold text-brand-navy-900">TrueNorth IUL</p>
              <p>123 Main St, Fort Worth, TX 76101</p>
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

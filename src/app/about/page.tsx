import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'What Is an IUL? — TrueNorth IUL',
  description:
    'Plain-English explanation of Indexed Universal Life insurance — what it is, how it works, who it fits, and who it doesn\'t.',
}

const SECTIONS = [
  {
    id: 'basics',
    heading: 'The Basics',
    content: `An Indexed Universal Life (IUL) policy is a type of permanent life insurance that provides a death benefit while also building cash value over time. Unlike term life, which covers you for a fixed period and pays nothing if you outlive it, or whole life, which grows at a fixed guaranteed rate, an IUL links your cash value growth to the performance of a stock market index — like the S&P 500 — without directly investing in the market.

The key mechanism: if the index goes up, your policy's cash value gets credited with a portion of that gain (subject to a cap). If the index goes down, your cash value is protected by a "floor" — typically 0% — meaning you never lose principal due to market downturns. This combination of upside participation and downside protection is the core appeal of an IUL.`,
  },
  {
    id: 'tax',
    heading: 'The Tax Advantage',
    content: `One of the most powerful features of an IUL is the tax treatment. When structured correctly:

• Cash value grows tax-deferred — you pay no taxes on gains year over year.
• Policy loans and withdrawals (up to basis) can be taken income-tax-free in retirement — because you're borrowing against the policy, not withdrawing taxable income.
• The death benefit passes to beneficiaries income-tax-free.

This creates a "tax-free retirement income" strategy that appeals to high earners who have already maxed out their 401(k) and IRA contributions, or to those seeking tax diversification across their retirement assets.

Important caveat: These tax advantages depend on the policy being properly funded and not becoming a Modified Endowment Contract (MEC). Policy design matters enormously — work with a knowledgeable professional.`,
  },
  {
    id: 'for',
    heading: 'Who It May Be For',
    content: `An IUL tends to be a stronger fit for people who:

• Earn $100,000+ annually and have disposable income to fund premiums consistently
• Have already maxed out 401(k) and IRA contributions and want additional tax-advantaged growth
• Are between ages 30–55, giving the policy time to accumulate meaningful cash value
• Want permanent life insurance protection alongside a savings component
• Are business owners or self-employed, where IUL can serve additional planning purposes
• Have a long time horizon (10–20+ years) — IULs are not short-term vehicles

The longer the funding runway and the higher the consistent funding level, the more powerful the tax-free income potential becomes.`,
  },
  {
    id: 'not-for',
    heading: "Who It's Not For",
    content: `Honesty matters. An IUL is likely not the right fit if you:

• Haven't yet built an emergency fund or paid off high-interest debt
• Need short-term savings access — IULs have surrender charges in the early years
• Are looking for pure investment returns — the cost of insurance reduces net returns
• Have limited disposable income — underfunded IULs can lapse and create tax problems
• Need pure term coverage to protect dependents on a tight budget

For most people, foundational financial steps (emergency fund, employer match, Roth IRA, term life) should come before an IUL. IUL is a complementary advanced strategy — not a replacement for the basics.`,
  },
]

export default function AboutPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-b from-white to-neutral-50 py-16 px-4 text-center" aria-labelledby="about-heading">
        <div className="max-w-content mx-auto">
          <h1 id="about-heading" className="font-display text-4xl md:text-5xl text-brand-navy-900 mb-4 text-balance">
            What Is an IUL?
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto text-balance">
            A plain-English look at Indexed Universal Life insurance — what it does,
            how the math works, and whether it makes sense for your situation.
          </p>
        </div>
      </section>

      {/* ─── Content ─── */}
      <article className="py-12 px-4 bg-white" aria-label="IUL educational content">
        <div className="max-w-results mx-auto">
          <div className="space-y-12">
            {SECTIONS.map((section) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
                <h2
                  id={`${section.id}-heading`}
                  className="font-display text-2xl text-brand-navy-900 mb-4 pb-2 border-b border-neutral-200"
                >
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.content.split('\n\n').map((para, i) => (
                    <p key={i} className="text-neutral-700 text-base leading-relaxed whitespace-pre-line">
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>

      {/* ─── CTA ─── */}
      <section className="py-14 px-4 bg-neutral-50 text-center" aria-labelledby="about-cta-heading">
        <div className="max-w-content mx-auto">
          <h2 id="about-cta-heading" className="font-display text-3xl text-brand-navy-900 mb-3">
            Not sure if it fits your situation?
          </h2>
          <p className="text-neutral-600 text-lg mb-6">
            Take the free quiz — 6 questions, under 2 minutes, instant personalized results.
          </p>
          <Link href="/quiz" className="btn-primary btn-primary-lg inline-flex">
            Take the Free Quiz →
          </Link>
        </div>
      </section>

      {/* ─── Disclaimer ─── */}
      <div className="px-4 py-6 bg-white border-t border-neutral-100">
        <p className="text-xs text-neutral-400 text-center max-w-2xl mx-auto leading-relaxed">
          Content on this page is for educational purposes only and does not constitute financial,
          tax, legal, or insurance advice. Individual circumstances vary. Consult a licensed
          professional before making any financial or insurance decisions.
        </p>
      </div>
    </>
  )
}

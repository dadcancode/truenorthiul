'use client'

interface QuizIntroProps {
  onStart: () => void
}

const BULLET_POINTS = [
  "Tax-free retirement income your 401(k) can't offer",
  'Market upside participation — with a floor that protects against losses',
  'A death benefit that pays out income-tax-free',
]

export default function QuizIntro({ onStart }: QuizIntroProps) {
  return (
    <div className="animate-fade-in">
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-teal-50 border border-brand-teal-200 mb-5">
          <span className="w-2 h-2 rounded-full bg-brand-teal-600 inline-block" aria-hidden="true" />
          <span className="text-sm font-medium text-brand-teal-700">Free &middot; 90 seconds &middot; No obligation</span>
        </div>

        <h2 className="font-display text-2xl md:text-3xl text-brand-navy-900 mb-4 text-balance">
          Most People Have Never Heard of This Strategy
        </h2>

        <p className="text-neutral-600 text-base leading-relaxed mb-2">
          Your advisor probably knows about it. Whether they&apos;ve brought it up is another story.
        </p>
        <p className="text-neutral-600 text-base leading-relaxed">
          This quiz tells you whether an IUL &mdash; one of the most overlooked tax-advantaged tools
          in financial planning &mdash; could actually work for <em>your</em> situation.
          Straight answer. No pitch.
        </p>
      </div>

      <div className="space-y-3 mb-7">
        {BULLET_POINTS.map((point) => (
          <div key={point} className="flex items-start gap-3">
            <span
              className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-teal-100 flex items-center justify-center mt-0.5"
              aria-hidden="true"
            >
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <p className="text-neutral-700 text-sm leading-relaxed">{point}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        className="btn-primary btn-primary-lg w-full"
        type="button"
      >
        Show Me If I Qualify &rarr;
      </button>

      <p className="text-center text-neutral-400 text-xs mt-3">
        6 questions &middot; Takes under 2 minutes
      </p>
    </div>
  )
}

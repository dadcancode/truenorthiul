import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="max-w-page mx-auto">
        <div className="flex flex-col items-center gap-3">
          <p className="font-display text-lg text-neutral-400">TrueNorth IUL</p>

          <nav aria-label="Footer navigation">
            <Link href="/privacy" className="footer-link">
              Privacy Policy
            </Link>
          </nav>

          <p className="footer-address">
            123 Main St, Fort Worth, TX 76101
          </p>

          <p className="footer-disclaimer">
            © 2026 TrueNorth IUL. Educational content only — not financial, tax, or insurance
            advice. Content on this site is for informational purposes and does not constitute
            personalized financial advice. Consult a licensed insurance or financial professional
            before making any decisions.
          </p>
        </div>
      </div>
    </footer>
  )
}

import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="site-nav" aria-label="Main navigation">
      <div className="nav-container">
        <Link href="/" className="nav-logo-text" aria-label="TrueNorth IUL home">
          TrueNorth IUL
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/about" className="nav-link hidden sm:block">
            What Is an IUL?
          </Link>
          <Link href="/quiz" className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
            Take the Quiz
          </Link>
        </div>
      </div>
    </nav>
  )
}

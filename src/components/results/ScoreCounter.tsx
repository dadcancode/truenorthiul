'use client'

import { useEffect, useState } from 'react'

interface ScoreCounterProps {
  score: number
  maxScore: number
}

export default function ScoreCounter({ score, maxScore }: ScoreCounterProps) {
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const duration = 800

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayed(Math.round(eased * score))
      if (progress < 1) requestAnimationFrame(tick)
    }

    const raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [score])

  return (
    <p className="score-number-enter text-7xl font-display text-brand-navy-900 leading-none mt-2 mb-1" aria-label={`Score: ${score} out of ${maxScore}`}>
      {displayed}
      <span className="text-4xl text-neutral-400">/{maxScore}</span>
    </p>
  )
}

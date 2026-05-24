'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Option {
  value: string
  label: string
}

interface QuizStepProps {
  question: string
  options: Option[]
  selectedValue: string | undefined
  onSelect: (value: string) => void
  onNext: () => void
  onBack: () => void
  showBack: boolean
  questionIndex: number
}

export default function QuizStep({
  question,
  options,
  selectedValue,
  onSelect,
  onNext,
  onBack,
  showBack,
  questionIndex,
}: QuizStepProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([])
  const focusedIndex = useRef<number>(-1)

  // Focus heading when step mounts
  useEffect(() => {
    headingRef.current?.focus()
  }, [questionIndex])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        const next = (index + 1) % options.length
        optionRefs.current[next]?.focus()
        focusedIndex.current = next
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        const prev = (index - 1 + options.length) % options.length
        optionRefs.current[prev]?.focus()
        focusedIndex.current = prev
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onSelect(options[index].value)
      }
    },
    [options, onSelect]
  )

  return (
    <div>
      {/* Back button */}
      {showBack && (
        <button
          onClick={onBack}
          className="btn-secondary mb-5 flex items-center gap-1.5 text-sm"
          style={{ padding: '0.375rem 0.875rem', fontSize: '0.875rem' }}
          aria-label="Go to previous question"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M9 11L5 7L9 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
      )}

      {/* Question */}
      <h2
        ref={headingRef}
        className="quiz-question mb-5 focus:outline-none"
        tabIndex={-1}
        aria-live="polite"
      >
        {question}
      </h2>

      {/* Answer options */}
      <div className="space-y-2.5" role="group" aria-label={question}>
        {options.map((option, i) => {
          const isSelected = selectedValue === option.value
          return (
            <button
              key={option.value}
              ref={(el) => { optionRefs.current[i] = el }}
              className={`answer-option ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelect(option.value)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              role="radio"
              aria-checked={isSelected}
              tabIndex={i === 0 ? 0 : -1}
            >
              <span className="radio-indicator" aria-hidden="true" />
              <span>{option.label}</span>
            </button>
          )
        })}
      </div>

      {/* Next button — appears only after selection */}
      {selectedValue && (
        <div className="mt-6 animate-fade-in">
          <button onClick={onNext} className="btn-primary btn-primary-full">
            Next →
          </button>
        </div>
      )}
    </div>
  )
}

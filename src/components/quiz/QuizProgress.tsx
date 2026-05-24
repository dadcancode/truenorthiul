interface QuizProgressProps {
  currentStep: number  // 0-5 = questions (6 = email gate)
  totalQuestions: number
}

export default function QuizProgress({ currentStep, totalQuestions }: QuizProgressProps) {
  const questionNumber = Math.min(currentStep + 1, totalQuestions)
  const isEmailStep = currentStep >= totalQuestions
  const progressPercent = isEmailStep
    ? 100
    : Math.round((currentStep / totalQuestions) * 100)

  return (
    <div className="mb-6">
      {/* Label */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-neutral-500">
          {isEmailStep ? 'Almost done!' : `Question ${questionNumber} of ${totalQuestions}`}
        </span>
        <span className="text-sm font-semibold text-brand-teal-600">
          {progressPercent}%
        </span>
      </div>

      {/* Progress bar */}
      <div
        className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={progressPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={isEmailStep ? 'Almost done' : `Question ${questionNumber} of ${totalQuestions}`}
      >
        <div
          className="h-full bg-brand-teal-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Step dots */}
      <div className="flex items-center mt-3 gap-0">
        {Array.from({ length: totalQuestions }).map((_, i) => {
          const isCompleted = i < currentStep
          const isCurrent = i === currentStep && !isEmailStep

          let dotClass = 'step-dot '
          if (isCompleted) dotClass += 'completed'
          else if (isCurrent) dotClass += 'active'
          else dotClass += 'upcoming'

          return (
            <div key={i} className="flex items-center flex-1">
              <div
                className={dotClass + (isCurrent ? ' animate-step-pulse' : '')}
                aria-hidden="true"
                style={{ width: '1.5rem', height: '1.5rem', fontSize: '0.6875rem' }}
              >
                {isCompleted ? (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              {i < totalQuestions - 1 && (
                <div className={`step-connector ${isCompleted ? 'completed' : ''}`} />
              )}
            </div>
          )
        })}
        {/* Email gate dot */}
        <div className="flex items-center flex-1">
          <div className={`step-connector ${isEmailStep ? 'completed' : ''}`} />
          <div
            className={`step-dot ${isEmailStep ? 'active' : 'upcoming'}`}
            aria-hidden="true"
            style={{ width: '1.5rem', height: '1.5rem', fontSize: '0.6875rem' }}
            title="Email"
          >
            <svg width="10" height="8" viewBox="0 0 12 10" fill="none" aria-hidden="true">
              <path d="M1 1h10v8H1V1zm0 0l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

import type { AgeBracket, CurrentInsurance, EmploymentType, FitTier, Income, PrimaryGoal, QuizAnswers, RetirementContributions } from '@/types'

// ─── Scoring Tables ─────────────────────────────────────────────────────────

const AGE_SCORES: Record<AgeBracket, number> = {
  under_30: 1,
  '30_45': 3,
  '45_55': 3,
  '55_plus': 2,
}

const INCOME_SCORES: Record<Income, number> = {
  under_50k: 1,
  '50_100k': 2,
  '100_200k': 3,
  '200k_plus': 3,
}

const RETIREMENT_SCORES: Record<RetirementContributions, number> = {
  no: 1,
  yes_not_maxed: 2,
  yes_maxed: 3,
}

const GOAL_SCORES: Record<PrimaryGoal, number> = {
  protect_family: 2,
  tax_free_retirement: 3,
  both: 3,
}

const INSURANCE_SCORES: Record<CurrentInsurance, number> = {
  none: 2,
  term: 3,
  whole_life: 1,
  other: 1,
}

const EMPLOYMENT_SCORES: Record<EmploymentType, number> = {
  employee: 2,
  self_employed: 3,
  business_owner: 3,
}

// ─── Scoring Functions ───────────────────────────────────────────────────────

/**
 * Calculates a composite IUL fit score from quiz answers.
 * Score range: 6–18 (sum of six dimensions, each 1–3).
 */
export function calculateScore(answers: QuizAnswers): number {
  return (
    AGE_SCORES[answers.age_bracket] +
    INCOME_SCORES[answers.income] +
    RETIREMENT_SCORES[answers.retirement_contributions] +
    GOAL_SCORES[answers.primary_goal] +
    INSURANCE_SCORES[answers.current_insurance] +
    EMPLOYMENT_SCORES[answers.employment_type]
  )
}

/**
 * Maps a numeric score to a FitTier.
 *   15–18 → strong
 *   10–14 → good
 *    6–9  → possible
 */
export function getTier(score: number): FitTier {
  if (score >= 15) return 'strong'
  if (score >= 10) return 'good'
  return 'possible'
}

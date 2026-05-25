import type {
  AgeBracket,
  CurrentInsurance,
  FitTier,
  Income,
  PrimaryConcern,
  PrimaryGoal,
  QuizAnswers,
  RetirementContributions,
} from '@/types'

// ─── Scoring Tables ─────────────────────────────────────────────────────────

// Q1 — Primary concern
// Tax burden + safe growth = prime IUL mindset
const CONCERN_SCORES: Record<PrimaryConcern, number> = {
  too_much_tax: 3,       // tax-free growth is the core IUL value prop
  want_safe_growth: 3,   // downside protection = key IUL differentiator
  family_protection: 2,  // protection need, IUL fits but so does term
  not_saving_enough: 2,  // needs a vehicle, possible IUL fit
}

// Q2 — Retirement savings status
// Maxed out = the textbook IUL candidate (no more tax-advantaged room)
const RETIREMENT_SCORES: Record<RetirementContributions, number> = {
  maxed_out: 3,              // classic IUL entry point — more to save, nowhere to put it
  contributing_regularly: 2, // disciplined saver, can likely fund IUL premiums
  contributing: 2,           // some discipline, needs guidance
  not_started: 1,            // foundation work needed first
}

// Q3 — Primary goal
const GOAL_SCORES: Record<PrimaryGoal, number> = {
  both: 3,                  // protection + growth = IUL's exact pitch
  tax_free_income: 3,       // tax-free retirement income = IUL core benefit
  family_protection: 2,     // protection focus — IUL works, term may be cheaper
  build_wealth_first: 1,    // not ready for IUL premium commitment yet
}

// Q4 — Current insurance
// Term holders are the prime upgrade target
const INSURANCE_SCORES: Record<CurrentInsurance, number> = {
  term: 3,          // temporary coverage, IUL adds permanence + cash value
  none: 2,          // clear protection gap, IUL fills it
  employer_only: 2, // dependent on employer = vulnerable, needs own coverage
  permanent: 1,     // already has something; IUL may duplicate
}

// Q5 — Income
const INCOME_SCORES: Record<Income, number> = {
  '200k_plus': 3,   // high income = high tax benefit from IUL
  '100_200k': 3,    // solid income, likely maxing other accounts
  '50_100k': 2,     // middle — IUL possible with right structure
  under_50k: 1,     // premium commitment may be a stretch
}

// Q6 — Age
// Sweet spot: 30–45 (long growth runway, protection window)
const AGE_SCORES: Record<AgeBracket, number> = {
  '30_45': 3,   // ideal — long runway for cash value compounding
  under_30: 2,  // great time to start; income may be lower
  '45_55': 2,   // still works; less time for compounding
  '55_plus': 1, // shorter runway; cost of insurance rises fast
}

// ─── Scoring Functions ───────────────────────────────────────────────────────

/**
 * Calculates a composite IUL fit score from quiz answers.
 * Score range: 6–18 (sum of six dimensions, each 1–3).
 */
export function calculateScore(answers: QuizAnswers): number {
  return (
    CONCERN_SCORES[answers.primary_concern] +
    RETIREMENT_SCORES[answers.retirement_contributions] +
    GOAL_SCORES[answers.primary_goal] +
    INSURANCE_SCORES[answers.current_insurance] +
    INCOME_SCORES[answers.income] +
    AGE_SCORES[answers.age_bracket]
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

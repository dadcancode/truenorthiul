// ─── Quiz Answer Types ─────────────────────────────────────────────────────

export type AgeBracket = 'under_30' | '30_45' | '45_55' | '55_plus'

export type Income = 'under_50k' | '50_100k' | '100_200k' | '200k_plus'

export type RetirementContributions = 'yes_maxed' | 'yes_not_maxed' | 'no'

export type PrimaryGoal = 'protect_family' | 'tax_free_retirement' | 'both'

export type CurrentInsurance = 'none' | 'term' | 'whole_life' | 'other'

export type EmploymentType = 'employee' | 'self_employed' | 'business_owner'

export type FitTier = 'strong' | 'good' | 'possible'

// ─── Core Interfaces ────────────────────────────────────────────────────────

export interface QuizAnswers {
  age_bracket: AgeBracket
  income: Income
  retirement_contributions: RetirementContributions
  primary_goal: PrimaryGoal
  current_insurance: CurrentInsurance
  employment_type: EmploymentType
}

/**
 * The enriched lead object written to Airtable and MailerLite.
 * Built server-side — never trust a client-submitted LeadPayload.
 */
export interface LeadPayload {
  email: string
  first_name?: string
  timestamp: string       // ISO 8601
  source: string          // UTM source or 'direct'
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  answers: QuizAnswers
  score: number           // 6–18
  fit_tier: FitTier
}

// ─── API Request / Response ─────────────────────────────────────────────────

export interface SubmitLeadRequest {
  email: string
  first_name?: string
  answers: QuizAnswers
  utm?: {
    source?: string
    medium?: string
    campaign?: string
    content?: string
    term?: string
  }
}

export interface SubmitLeadResponse {
  success: boolean
  tier?: FitTier
  score?: number
  error?: string
  code?: string
}

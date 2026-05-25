import { z } from 'zod'

// ─── Enum schemas ─────────────────────────────────────────────────────────────

const primaryConcernSchema = z.enum([
  'not_saving_enough',
  'family_protection',
  'too_much_tax',
  'want_safe_growth',
])

const retirementContributionsSchema = z.enum([
  'not_started',
  'contributing',
  'contributing_regularly',
  'maxed_out',
])

const primaryGoalSchema = z.enum([
  'tax_free_income',
  'family_protection',
  'both',
  'build_wealth_first',
])

const currentInsuranceSchema = z.enum(['none', 'term', 'permanent', 'employer_only'])

const incomeSchema = z.enum(['under_50k', '50_100k', '100_200k', '200k_plus'])

const ageBracketSchema = z.enum(['under_30', '30_45', '45_55', '55_plus'])

// ─── Quiz answers schema ──────────────────────────────────────────────────────

export const quizAnswersSchema = z.object({
  primary_concern: primaryConcernSchema,
  retirement_contributions: retirementContributionsSchema,
  primary_goal: primaryGoalSchema,
  current_insurance: currentInsuranceSchema,
  income: incomeSchema,
  age_bracket: ageBracketSchema,
})

// ─── UTM params schema ────────────────────────────────────────────────────────

const utmSchema = z
  .object({
    source: z.string().max(200).optional(),
    medium: z.string().max(200).optional(),
    campaign: z.string().max(200).optional(),
    content: z.string().max(200).optional(),
    term: z.string().max(200).optional(),
  })
  .optional()

// ─── Full request schema ──────────────────────────────────────────────────────

/**
 * Strict Zod schema for POST /api/submit-lead.
 * Uses .strict() to reject unknown top-level keys.
 */
export const submitLeadSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email is required.')
      .email('Please enter a valid email address.')
      .max(254, 'Email address is too long.')
      .transform((v) => v.trim().toLowerCase()),

    first_name: z
      .string()
      .max(100, 'First name is too long.')
      .transform((v) => v.trim())
      .optional(),

    answers: quizAnswersSchema,

    utm: utmSchema,
  })
  .strict()

// ─── Inferred types ───────────────────────────────────────────────────────────

/** Validated + transformed request body (post-parse). */
export type SubmitLeadInput = z.infer<typeof submitLeadSchema>

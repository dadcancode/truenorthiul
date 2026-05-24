import { z } from 'zod'

// ─── Enum schemas ─────────────────────────────────────────────────────────────

const ageBracketSchema = z.enum(['under_30', '30_45', '45_55', '55_plus'])

const incomeSchema = z.enum(['under_50k', '50_100k', '100_200k', '200k_plus'])

const retirementContributionsSchema = z.enum(['yes_maxed', 'yes_not_maxed', 'no'])

const primaryGoalSchema = z.enum(['protect_family', 'tax_free_retirement', 'both'])

const currentInsuranceSchema = z.enum(['none', 'term', 'whole_life', 'other'])

const employmentTypeSchema = z.enum(['employee', 'self_employed', 'business_owner'])

// ─── Quiz answers schema ──────────────────────────────────────────────────────

export const quizAnswersSchema = z.object({
  age_bracket: ageBracketSchema,
  income: incomeSchema,
  retirement_contributions: retirementContributionsSchema,
  primary_goal: primaryGoalSchema,
  current_insurance: currentInsuranceSchema,
  employment_type: employmentTypeSchema,
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

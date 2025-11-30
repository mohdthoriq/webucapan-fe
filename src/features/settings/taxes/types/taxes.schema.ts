import { z } from 'zod'

export const createTaxesSchema = z.object({
  name: z.string(),
  rate: z.number(),
  description: z.string().optional(),
  company_id: z.string(),
})

export type CreateTaxesFormData = z.infer<typeof createTaxesSchema>

export const updateTaxesSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string().optional(),
  rate: z.number(),
})

export type UpdateTaxesFormData = z.infer<typeof updateTaxesSchema>

export const deleteTaxesSchema = z.object({
  id: z.uuid(),
})

export type DeleteTaxesFormData = z.infer<typeof deleteTaxesSchema>

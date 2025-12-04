import { z } from 'zod'

export const createPaymentTermsSchema = z.object({
  name: z.string(),
  days: z.number(),
  description: z.string().optional(),
  company_id: z.string(),
})

export type CreatePaymentTermsFormData = z.infer<
  typeof createPaymentTermsSchema
>

export const updatePaymentTermsSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string().optional(),
  days: z.number(),
})

export type UpdatePaymentTermsFormData = z.infer<
  typeof updatePaymentTermsSchema
>

export const deletePaymentTermsSchema = z.object({
  id: z.uuid(),
})

export type DeletePaymentTermsFormData = z.infer<
  typeof deletePaymentTermsSchema
>

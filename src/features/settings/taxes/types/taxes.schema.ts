import { z } from 'zod'

export const createTaxesSchema = z.object({
  name: z.string().min(1, 'Nama pajak harus diisi'),
  rate: z.number().min(0, 'Rate tidak boleh negatif'),
  description: z.string().optional(),
  company_id: z.string().min(1, 'Company ID harus diisi'),
})

export type CreateTaxesFormData = z.infer<typeof createTaxesSchema>

export const updateTaxesSchema = z.object({
  id: z.string().uuid('ID tidak valid'),
  name: z.string().min(1, 'Nama pajak harus diisi'),
  description: z.string().optional(),
  rate: z.number().min(0, 'Rate tidak boleh negatif'),
})

export type UpdateTaxesFormData = z.infer<typeof updateTaxesSchema>

export const deleteTaxesSchema = z.object({
  id: z.uuid(),
})

export type DeleteTaxesFormData = z.infer<typeof deleteTaxesSchema>

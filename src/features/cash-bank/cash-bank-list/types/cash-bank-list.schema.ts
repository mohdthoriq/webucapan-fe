import { z } from 'zod'

export const createCashBankListSchema = z.object({
  from_account_id: z.uuid(),
  to_account_id: z.uuid(),
  tags: z.array(z.uuid()).nullable(),
  amount: z.number().positive('Jumlah harus lebih dari 0'),
  date: z.date().min(1, 'Tanggal harus diisi'),
  description: z.string().optional(),
})

export type CreateCashBankListFormData = z.infer<
  typeof createCashBankListSchema
>

export const updateCashBankListSchema = z.object({
  id: z.uuid(),
  from_account_id: z.uuid(),
  to_account_id: z.uuid(),
  tags: z.array(z.uuid()).nullable(),
  amount: z.number().positive('Jumlah harus lebih dari 0'),
  date: z.date().min(1, 'Tanggal harus diisi'),
  description: z.string().optional(),
})

export type UpdateCashBankListFormData = z.infer<
  typeof updateCashBankListSchema
>

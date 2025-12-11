import { z } from 'zod'

export const createAccountSchema = z.object({
  code: z.string().min(1, 'Kode harus diisi'),
  name: z.string().min(1, 'Nama harus diisi'),
  type_id: z.string().min(1, 'Tipe harus diisi'),
  category_id: z.string().optional(),
  parent_id: z.string().optional(),
  allow_transaction: z.boolean().optional(),
  is_active: z.boolean().optional(),
  description: z.string().optional(),
})

export type CreateAccountFormData = z.infer<typeof createAccountSchema>

export const updateAccountSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, 'Nama harus diisi'),
  type_id: z.string().min(1, 'Tipe harus diisi'),
  code: z.string().min(1, 'Kode harus diisi'),
  category_id: z.string().optional(),
  parent_id: z.string().optional(),
  allow_transaction: z.boolean().optional(),
  is_active: z.boolean().optional(),
  description: z.string().optional(),
})

export type UpdateAccountFormData = z.infer<typeof updateAccountSchema>

export const deleteAccountSchema = z.object({
  id: z.uuid(),
})

export type DeleteAccountFormData = z.infer<typeof deleteAccountSchema>

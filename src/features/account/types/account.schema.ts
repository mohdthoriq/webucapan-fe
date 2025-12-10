import { z } from 'zod'

export const createAccountSchema = z.object({
  code: z.string().min(1, 'Kode harus diisi'),
  name: z.string().min(1, 'Nama harus diisi'),
  allow_transaction: z.boolean(),
  is_active: z.boolean(),
  description: z.string().min(1, 'Deskripsi harus diisi'),
  type_id: z.string().min(1, 'Tipe harus diisi'),
  category_id: z.string().min(1, 'Kategori harus diisi'),
  parent_id: z.string().min(1, 'Parent harus diisi'),
  company_id: z.string().min(1, 'Perusahaan harus diisi'),
})

export type CreateAccountFormData = z.infer<typeof createAccountSchema>

export const updateAccountSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, 'Nama harus diisi'),
  type_id: z.string().min(1, 'Tipe harus diisi'),
  company_id: z.string().min(1, 'Perusahaan harus diisi'),
})

export type UpdateAccountFormData = z.infer<typeof updateAccountSchema>

export const deleteAccountSchema = z.object({
  id: z.uuid(),
})

export type DeleteAccountFormData = z.infer<typeof deleteAccountSchema>

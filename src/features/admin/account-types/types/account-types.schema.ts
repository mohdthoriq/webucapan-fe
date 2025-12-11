import { z } from 'zod'

export const createAccountTypeSchema = z.object({
  name: z.string().min(1, 'Nama Tipe Akun harus diisi'),
  code: z.string().min(1, 'Kode Tipe Akun harus diisi'),
  normal_balance: z.string().min(1, 'Normal Balance harus diisi'),
})

export type CreateAccountTypeFormData = z.infer<typeof createAccountTypeSchema>

export const updateAccountTypeSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, 'Nama Tipe Akun harus diisi'),
  code: z.string().min(1, 'Kode Tipe Akun harus diisi'),
  normal_balance: z.string().min(1, 'Normal Balance harus diisi'),
})

export type UpdateAccountTypeFormData = z.infer<typeof updateAccountTypeSchema>

export const deleteAccountTypeSchema = z.object({
  id: z.uuid(),
})

export type DeleteAccountTypeFormData = z.infer<typeof deleteAccountTypeSchema>

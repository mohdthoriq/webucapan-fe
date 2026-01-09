import { z } from 'zod'

export const createAccountCategorySchema = z.object({
  name: z.string().min(1, 'Nama kategori akun harus diisi'),
  description: z.string().min(1, 'Deskripsi kategori akun harus diisi'),
})

export type CreateAccountCategoryFormData = z.infer<
  typeof createAccountCategorySchema
>

export const updateAccountCategorySchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, 'Nama kategori akun harus diisi'),
  description: z.string().min(1, 'Deskripsi kategori akun harus diisi'),
})

export type UpdateAccountCategoryFormData = z.infer<
  typeof updateAccountCategorySchema
>

export const deleteAccountCategorySchema = z.object({
  id: z.uuid(),
})

export type DeleteAccountCategoryFormData = z.infer<
  typeof deleteAccountCategorySchema
>

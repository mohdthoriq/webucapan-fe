import { z } from 'zod'

export const createUserSchema = z.object({
  email: z.email('Email tidak valid').min(1, 'Email harus diisi'),
  full_name: z.string().min(1, 'Nama lengkap harus diisi'),
  role_id: z.string().min(1, 'Role harus diisi'),
  company_id: z.string().min(1, 'Perusahaan harus diisi')
})

export type CreateUserFormData = z.infer<typeof createUserSchema>

// export const updateAccountSchema = z.object({
//   id: z.uuid(),
//   name: z.string().min(1, 'Nama harus diisi'),
//   type_id: z.string().min(1, 'Tipe harus diisi'),
//   code: z.string().min(1, 'Kode harus diisi'),
//   category_id: z.string().optional(),
//   parent_id: z.string().optional().nullable(),
//   allow_transaction: z.boolean().optional(),
//   is_active: z.boolean().optional(),
//   description: z.string().optional(),
// })

// export type UpdateAccountFormData = z.infer<typeof updateAccountSchema>

// export const deleteAccountSchema = z.object({
//   id: z.uuid(),
// })

// export type DeleteAccountFormData = z.infer<typeof deleteAccountSchema>

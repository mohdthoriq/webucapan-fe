import { z } from 'zod'

export const userSettingsSchema = z
  .object({
    full_name: z
      .string()
      .min(2, { message: 'Nama lengkap minimal 2 karakter' })
      .max(100, { message: 'Nama lengkap maksimal 100 karakter' }),
    email: z
      .string()
      .email({ message: 'Email tidak valid' })
      .min(1, { message: 'Email wajib diisi' }),
    current_password: z.string().optional(),
    new_password: z
      .string()
      .min(8, { message: 'Password minimal 8 karakter' })
      .optional()
      .or(z.literal('')),
    confirm_password: z.string().optional().or(z.literal('')),
  })
  .refine(
    (data) => {
      // If new_password is provided, current_password must also be provided
      if (data.new_password && data.new_password.length > 0) {
        return data.current_password && data.current_password.length > 0
      }
      return true
    },
    {
      message: 'Password saat ini wajib diisi untuk mengubah password',
      path: ['current_password'],
    }
  )
  .refine(
    (data) => {
      // If new_password is provided, confirm_password must match
      if (data.new_password && data.new_password.length > 0) {
        return data.new_password === data.confirm_password
      }
      return true
    },
    {
      message: 'Konfirmasi password tidak cocok',
      path: ['confirm_password'],
    }
  )

export type UserSettingsFormData = z.infer<typeof userSettingsSchema>

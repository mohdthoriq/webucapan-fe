import z from 'zod'

export const ResetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Token tidak boleh kosong'),
    password: z
      .string()
      .min(1, 'Tolong masukkan kata sandi Anda')
      .min(7, 'Kata sandi harus minimal 7 karakter'),
    confirmPassword: z.string().min(1, 'Tolong konfirmasi kata sandi Anda'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Kata sandi tidak cocok.',
    path: ['confirmPassword'],
  })

export type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>

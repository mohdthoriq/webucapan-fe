import z from 'zod'

export const VerifyEmailSchema = z.object({
  otp_code: z
    .string()
    .min(6, 'Please enter the 6-digit code.')
    .max(6, 'Please enter the 6-digit code.'),
  email: z.email(),
  purpose: z.enum(['registration', 'login', 'email-change', 'password-reset']),
})

export type VerifyEmailFormData = z.infer<typeof VerifyEmailSchema>

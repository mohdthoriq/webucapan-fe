import z from 'zod'

export const VerifyEmailSchema = z.object({
  otp_code: z
    .string()
    .min(6, 'Please enter the 6-digit code.')
    .max(6, 'Please enter the 6-digit code.'),
  email: z.email(),
  purpose: z.string(),
})

export type VerifyEmailFormValues = z.infer<typeof VerifyEmailSchema>

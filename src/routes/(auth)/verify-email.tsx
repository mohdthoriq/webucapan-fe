import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { AuthPurpose } from '@/types'
import { VerifyEmail } from '@/features/auth/verify-email'

const searchSchema = z.object({
  email: z.string().optional(),
  purpose: z.enum(AuthPurpose),
})

export const Route = createFileRoute('/(auth)/verify-email')({
  component: VerifyEmail,
  validateSearch: searchSchema,
})

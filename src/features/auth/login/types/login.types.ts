import z from 'zod'

export interface LoginResponse {
  accessToken: string
  refreshToken: string
}

export const LoginSchema = z.object({
  email: z.email({
    error: (iss) =>
      iss.input === '' ? 'Silakan masukkan email Anda' : undefined,
  }),
  password: z
    .string()
    .min(1, 'Silakan masukkan kata sandi Anda')
    .min(7, 'Kata sandi harus minimal 7 karakter'),
})

export type LoginFormValues = z.infer<typeof LoginSchema>

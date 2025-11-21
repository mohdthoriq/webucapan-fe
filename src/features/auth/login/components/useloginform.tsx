import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import { sleep } from '@/lib/utils'

const formSchema = z.object({
  email: z.email({
    error: (iss) =>
      iss.input === '' ? 'Silakan masukkan email Anda' : undefined,
  }),
  password: z
    .string()
    .min(1, 'Silakan masukkan kata sandi Anda')
    .min(7, 'Kata sandi harus minimal 7 karakter'),
})

export type LoginFormValues = z.infer<typeof formSchema>

interface UseLoginFormProps {
  redirectTo?: string
}

export function useLoginForm({ redirectTo }: UseLoginFormProps = {}) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { auth } = useAuthStore()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(data: LoginFormValues) {
    setIsLoading(true)

    toast.promise(sleep(2000), {
      loading: 'Loading...',
      success: () => {
        setIsLoading(false)

        // Mock successful authentication with expiry computed at success time
        const mockUser = {
          accountNo: 'ACC001',
          email: data.email,
          role: ['user'],
          exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
        }

        // Set user and access token
        auth.setUser(mockUser)
        auth.setAccessToken('mock-access-token')

        // Redirect to the stored location or default to dashboard
        const targetPath = redirectTo || '/'
        navigate({ to: targetPath, replace: true })

        return `Selamat datang kembali, ${data.email}!`
      },
      error: 'Kesalahan',
    })
  }

  return {
    form,
    isLoading,
    onSubmit,
  }
}

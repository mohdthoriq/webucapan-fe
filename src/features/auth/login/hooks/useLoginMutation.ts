import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import type { ApiResponse, LoginResponse } from '@/types'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import apiClient from '@/lib/api-client'
import type { LoginFormData } from '../types/login.types'

interface UseLoginMutationProps {
  onUnverifiedEmail?: (email: string) => void
}

export function useLoginMutation({
  onUnverifiedEmail,
}: UseLoginMutationProps = {}) {
  const navigate = useNavigate()
  const { auth } = useAuthStore()

  const searchParams = useSearch({ strict: false }) as { redirect?: string }

  return useMutation({
    mutationFn: async (
      credentials: LoginFormData
    ): Promise<ApiResponse<LoginResponse>> => {
      const response = await apiClient.post<ApiResponse<LoginResponse>>(
        '/auth/login',
        credentials
      )
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'login-toast' })
    },
    onSuccess: async (data) => {
      toast.dismiss('login-toast')

      auth.setTokens(data.data!.access_token, data.data!.refresh_token)

      try {
        const response =
          await apiClient.get<ApiResponse<LoginResponse>>('/auth/me')

        const userData = response.data!.data!

        auth.setUser(userData)

        const greetingsSubject = response.data!.data!.user!.full_name
          ? response.data!.data!.user!.full_name
          : response.data!.data!.user!.email

        toast.success(`Selamat datang kembali, ${greetingsSubject}!`)
      } catch {
        // If profile fetch fails, still show success
        toast.success('Login berhasil!')
      }

      try {
        // Use redirect param if it exists, otherwise go to home
        const targetPath = searchParams.redirect || '/'
        await navigate({ to: targetPath, replace: true })
      } catch {
        // Navigation error, but login was successful - silently ignore
      }
    },
    onError: (error, variables) => {
      toast.dismiss('login-toast')

      if (error instanceof AxiosError) {
        const errorCode = error.response?.data?.code

        if (errorCode === 401) {
          // Email not verified
          onUnverifiedEmail?.(variables.email)
          return
        }
      }

      toast.error('Login gagal. Silakan periksa email dan kata sandi Anda.')
    },
  })
}

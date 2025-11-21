import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import type { ApiResponse } from '@/types/global-types/api-response'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import apiClient from '@/lib/api-client'
import type { ProfileResponse } from '@/features/settings/profile/types/profile.type'
import type { LoginResponse } from '../types/login.types'
import type { LoginFormValues } from './useLoginForm'

interface UseLoginMutationProps {
  redirectTo?: string
}

export function useLoginMutation({ redirectTo }: UseLoginMutationProps = {}) {
  const navigate = useNavigate()
  const { auth } = useAuthStore()

  return useMutation({
    mutationFn: async (
      credentials: LoginFormValues
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

      auth.setAccessToken(data.data!.accessToken)

      const response =
        await apiClient.get<ApiResponse<ProfileResponse>>('/auth/me')

      auth.setUser(response.data!.data!.user)

      const greetingsSubject = response.data!.data!.user!.full_name
        ? response.data!.data!.user!.full_name
        : response.data!.data!.user!.email

      toast.success(`Selamat datang kembali, ${greetingsSubject}!`)
      try {
        const targetPath = redirectTo || '/'
        await navigate({ to: targetPath, replace: true })
      } catch {
        // Navigation error, but login was successful - silently ignore
      }
    },
    onError: () => {
      toast.dismiss('login-toast')
      toast.error('Login gagal. Silakan periksa email dan kata sandi Anda.')
    },
  })
}

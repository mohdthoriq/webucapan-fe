import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import type { ApiResponse } from '@/types/global-types/api-response'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import type { ForgotPasswordFormData } from '../types/forgot-password.types'

interface UseForgotPasswordMutationProps {
  redirectTo?: string
}

export function useForgotPasswordMutation({
  redirectTo = '/login',
}: UseForgotPasswordMutationProps = {}) {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (
      data: ForgotPasswordFormData
    ): Promise<ApiResponse<void>> => {
      const response = await apiClient.post<ApiResponse<void>>(
        '/auth/forgot-password',
        data
      )
      return response.data
    },
    onMutate: () => {
      toast.loading('Mengirim email...', { id: 'forgot-password-toast' })
    },
    onSuccess: async (_, variables) => {
      toast.dismiss('forgot-password-toast')
      toast.success(`Email telah dikirim ke ${variables.email}`)

      try {
        await navigate({
          to: redirectTo,
          // search: { email: variables.email },
          replace: true,
        })
      } catch {
        // Navigation error, but request was successful - silently ignore
      }
    },
    onError: () => {
      toast.dismiss('forgot-password-toast')
      toast.error('Gagal mengirim email. Silakan coba lagi.')
    },
  })
}

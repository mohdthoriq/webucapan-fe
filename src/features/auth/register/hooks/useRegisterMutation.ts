import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import type { ApiResponse } from '@/types/global-types/api-response'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import type {
  RegisterResponse,
  RegisterFormValues,
} from '../types/register.types'

export function useRegisterMutation() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (
      credentials: RegisterFormValues
    ): Promise<ApiResponse<RegisterResponse>> => {
      const response = await apiClient.post<ApiResponse<RegisterResponse>>(
        '/auth/register',
        credentials
      )
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'register-toast' })
    },
    onSuccess: async (_, variables) => {
      toast.dismiss('register-toast')

      toast.success('Pendaftaran berhasil! Silakan verifikasi email Anda.')

      try {
        // Redirect to OTP verification page with email parameter
        await navigate({ 
          to: '/verify-email', 
          search: { email: variables.email }, 
          replace: true 
        })
      } catch {
        // Continue without navigation - user can manually navigate
      }
    },
    onError: () => {
      toast.dismiss('register-toast')
      toast.error('Pendaftaran gagal. Silakan lakukan ulang pendaftaran.')
    },
  })
}

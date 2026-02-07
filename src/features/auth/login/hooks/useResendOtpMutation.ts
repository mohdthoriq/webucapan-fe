import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import type { ApiResponse } from '@/types'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'

interface ResendOtpPayload {
  email: string
  purpose: string
  redirectTo?: string
}

export function useResendOtpMutation() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (
      payload: ResendOtpPayload
    ): Promise<ApiResponse<null>> => {
      const response = await apiClient.post<ApiResponse<null>>(
        '/auth/otp/resend',
        payload
      )
      return response.data
    },
    onMutate: () => {
      toast.loading('Mengirim ulang kode OTP...', { id: 'resend-otp-toast' })
    },
    onSuccess: async (_data, variables) => {
      toast.dismiss('resend-otp-toast')
      toast.success(
        'Kode OTP berhasil dikirim ulang. Silakan periksa email Anda.'
      )

      await navigate({ to: variables.redirectTo, replace: true })
    },
    onError: (error) => {
      toast.dismiss('resend-otp-toast')
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      } else {
        toast.error('Gagal mengirim ulang kode OTP. Silakan coba lagi.')
      }
    },
  })
}

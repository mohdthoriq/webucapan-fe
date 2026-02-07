import { useMutation } from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { AuthPurpose } from '@/types'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { type VerifyEmailFormData } from '../types/verify-email.types'

export function useVerifyEmailMutation({ purpose }: { purpose: AuthPurpose }) {
  const navigate = useNavigate()
  const search = useSearch({ from: '/(auth)/verify-email' })

  return useMutation({
    mutationFn: async (credentials: VerifyEmailFormData) => {
      const response = await apiClient.post('/auth/otp/verify', credentials)
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'VerifyEmail-toast' })
    },
    onSuccess: async (_, credentials) => {
      toast.dismiss('VerifyEmail-toast')

      toast.success('Email berhasil di verifikasi! Silakan Login.')

      try {
        if (purpose === AuthPurpose.Registration)
          await navigate({ to: '/login', replace: true })
        else
          await navigate({
            to: '/reset-password',
            replace: true,
            search: { email: search.email, otp_code: credentials.otp_code },
          })
      } catch {
        // Continue without navigation - user can manually navigate
      }
    },
    onError: () => {
      toast.dismiss('VerifyEmail-toast')
      toast.error('Verifikasi gagal. Silakan lakukan ulang verifikasi.')
    },
  })
}

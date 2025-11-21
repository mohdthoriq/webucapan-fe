import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { type VerifyEmailFormValues } from '../types/verify-email.types'

export function useVerifyEmailMutation() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (credentials: VerifyEmailFormValues) => {
      const response = await apiClient.post('/auth/otp/verify', credentials)
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'VerifyEmail-toast' })
    },
    onSuccess: async () => {
      toast.dismiss('VerifyEmail-toast')

      toast.success('Email berhasil di verifikasi! Silakan Login.')

      try {
        // Redirect to OTP verification page
        await navigate({ to: '/login', replace: true })
      } catch {
        // Continue without navigation - user can manually navigate
      }
    },
    onError: () => {
      toast.dismiss('VerifyEmail-toast')
      toast.error('Pendaftaran gagal. Silakan lakukan ulang pendaftaran.')
    },
  })
}

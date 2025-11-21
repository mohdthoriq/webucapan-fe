import { useMutation } from '@tanstack/react-query'
import type { ApiResponse } from '@/types/global-types/api-response'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import type { RegisterResponse } from '../types/register.types'
import type { RegisterFormValues } from './useRegisterForm'

export function useRegisterMutation() {
  // const navigate = useNavigate()

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
    onSuccess: async () => {
      toast.dismiss('register-toast')

      toast.success(`Berhasil Melakukan Pendaftaran.`)
      // try {
      //   const targetPath = redirectTo || '/'
      //   await navigate({ to: targetPath, replace: true })
      // } catch {
      //   // Navigation error, but register was successful - silently ignore
      // }
    },
    onError: () => {
      toast.dismiss('register-toast')
      toast.error('Pendaftaran gagal. Silakan lakukan ulang pendaftaran.')
    },
  })
}

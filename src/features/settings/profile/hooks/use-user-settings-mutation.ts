import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { type UserSettingsFormData } from '../types/user-settings.schema'

export function useUserSettingsMutation(userId: string) {
  return useMutation({
    mutationFn: async (credentials: UserSettingsFormData) => {
      const response = await apiClient.patch(`users/${userId}`, credentials)
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'user-settings-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('user-settings-toast')

      toast.success('Pengaturan berhasil diubah.')
    },
    onError: () => {
      toast.dismiss('user-settings-toast')
      toast.error('Pengaturan gagal diubah.')
    },
  })
}

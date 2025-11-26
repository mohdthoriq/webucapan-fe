import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { type CompanySettingsFormData } from '../types/company-settings.schema'

export function useCompanySettingsMutation(companyId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: CompanySettingsFormData) => {
      const response = await apiClient.patch(
        `companies/${companyId}`,
        credentials
      )
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'company-settings-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('company-settings-toast')
      await queryClient.invalidateQueries({ queryKey: ['company', companyId] })
      toast.success('Pengaturan perusahaan berhasil diubah.')
    },
    onError: () => {
      toast.dismiss('company-settings-toast')
      toast.error('Pengaturan perusahaan gagal diubah.')
    },
  })
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { type CompanyRoleSettingsFormData } from '../types/company-roles.schema'

export function useCreateCompanyRoleMutation(companyId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: CompanyRoleSettingsFormData) => {
      const response = await apiClient.post(`roles`, credentials)
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'company-roles-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('company-roles-toast')
      await queryClient.invalidateQueries({ queryKey: ['company', companyId] })
      toast.success('Peran berhasil ditambahkan.')
    },
    onError: () => {
      toast.dismiss('company-roles-toast')
      toast.error('Peran gagal ditambahkan.')
    },
  })
}

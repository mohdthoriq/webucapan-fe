import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { useCompanyRoles } from '../components/company-roles-provider'
import {
  type CreateCompanyRoleSettingsFormData,
  type UpdateCompanyRoleSettingsFormData,
  type DeleteCompanyRoleSettingsFormData,
} from '../types/company-roles.schema'

export function useCreateCompanyRoleMutation() {
  const { setOpen } = useCompanyRoles()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: CreateCompanyRoleSettingsFormData) => {
      const response = await apiClient.post(`roles`, credentials)
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'company-roles-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('company-roles-toast')
      await queryClient.invalidateQueries({ queryKey: ['company-roles'] })
      toast.success('Peran berhasil ditambahkan.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('company-roles-toast')
      toast.error('Peran gagal ditambahkan.')
    },
  })
}

export function useUpdateCompanyRoleMutation() {
  const { setOpen } = useCompanyRoles()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: UpdateCompanyRoleSettingsFormData) => {
      const response = await apiClient.patch(
        `roles/${credentials.id}`,
        credentials
      )
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'company-roles-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('company-roles-toast')
      await queryClient.invalidateQueries({ queryKey: ['company-roles'] })
      toast.success('Peran berhasil diubah.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('company-roles-toast')
      toast.error('Peran gagal diubah.')
    },
  })
}

export function useDeleteCompanyRoleMutation() {
  const { setOpen } = useCompanyRoles()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: DeleteCompanyRoleSettingsFormData) => {
      const response = await apiClient.delete(`roles/${credentials.id}`)

      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'company-roles-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('company-roles-toast')
      await queryClient.invalidateQueries({ queryKey: ['company-roles'] })
      toast.success('Peran berhasil dihapus.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('company-roles-toast')
      toast.error('Peran gagal dihapus.')
    },
  })
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { useTaxes } from '../components/taxes-provider'
import {
  type CreateTaxesFormData,
  type UpdateTaxesFormData,
  type DeleteTaxesFormData,
} from '../types/taxes.schema'

export function useCreateTaxMutation() {
  const { setOpen } = useTaxes()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: CreateTaxesFormData) => {
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

export function useUpdateTaxMutation() {
  const { setOpen } = useTaxes()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: UpdateTaxesFormData) => {
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

export function useDeleteTaxMutation() {
  const { setOpen } = useTaxes()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: DeleteTaxesFormData) => {
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

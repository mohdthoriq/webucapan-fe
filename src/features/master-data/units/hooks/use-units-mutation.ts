import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import {
  type CreateUnitFormData,
  type UpdateUnitFormData,
  type DeleteUnitFormData,
} from '@/features/master-data/units/types/units.schema'
import { useUnits } from '../components/units-provider'

export function useCreateUnitMutation() {
  const { setOpen } = useUnits()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: CreateUnitFormData) => {
      const response = await apiClient.post(`units`, credentials)
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'units-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('units-toast')
      await queryClient.invalidateQueries({ queryKey: ['units'] })
      toast.success('Satuan berhasil ditambahkan.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('units-toast')
      toast.error('Satuan gagal ditambahkan.')
    },
  })
}

export function useUpdateUnitMutation() {
  const { setOpen } = useUnits()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: UpdateUnitFormData) => {
      const response = await apiClient.patch(
        `units/${credentials.id}`,
        credentials
      )
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'units-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('units-toast')
      await queryClient.invalidateQueries({ queryKey: ['units'] })
      toast.success('Satuan berhasil diubah.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('units-toast')
      toast.error('Satuan gagal diubah.')
    },
  })
}

export function useDeleteUnitMutation() {
  const { setOpen } = useUnits()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: DeleteUnitFormData) => {
      const response = await apiClient.delete(`units/${credentials.id}`)

      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'units-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('units-toast')
      await queryClient.invalidateQueries({ queryKey: ['units'] })
      toast.success('Satuan berhasil dihapus.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('units-toast')
      toast.error('Satuan gagal dihapus.')
    },
  })
}

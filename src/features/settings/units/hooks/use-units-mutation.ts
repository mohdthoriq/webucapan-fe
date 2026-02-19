import { useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Unit } from '@/types'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { QUERY_KEY } from '@/constants/query-key'
import {
  type CreateUnitFormData,
  type UpdateUnitFormData,
  type DeleteUnitFormData,
} from '@/features/settings/units/types/units.schema'
import { UnitsContext, useUnits } from '../components/units-provider'

export function useCreateUnitMutation(onSuccess?: (data: Unit) => void) {
  const context = useContext(UnitsContext)
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: CreateUnitFormData) => {
      const response = await apiClient.post(`units`, credentials)
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'units-toast' })
    },
    onSuccess: async (data) => {
      toast.dismiss('units-toast')
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.UNITS] })
      toast.success('Satuan berhasil ditambahkan.')
      context?.setOpen(null)
      onSuccess?.(data)
    },
    onError: () => {
      toast.dismiss('units-toast')
      toast.error('Satuan gagal ditambahkan.')
    },
  })
}

export function useUpdateUnitMutation(onSuccess?: (data: Unit) => void) {
  const context = useContext(UnitsContext)

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
    onSuccess: async (data) => {
      toast.dismiss('units-toast')
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.UNITS] })
      toast.success('Satuan berhasil diubah.')
      context?.setOpen(null)
      onSuccess?.(data)
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
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.UNITS] })
      toast.success('Satuan berhasil dihapus.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('units-toast')
      toast.error('Satuan gagal dihapus.')
    },
  })
}

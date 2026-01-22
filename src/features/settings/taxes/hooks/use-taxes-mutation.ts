import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { TaxesContext, useTaxes } from '../components/taxes-provider'
import {
  type CreateTaxesFormData,
  type UpdateTaxesFormData,
  type DeleteTaxesFormData,
} from '../types/taxes.schema'
import type { Tax } from '@/types'
import { useContext } from 'react'

export function useCreateTaxMutation(onSuccess?: (data: Tax) => void) {
  const context = useContext(TaxesContext)

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: CreateTaxesFormData) => {
      const response = await apiClient.post(`taxes`, credentials)
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'taxes-toast' })
    },
    onSuccess: async (data) => {
      toast.dismiss('taxes-toast')
      await queryClient.invalidateQueries({ queryKey: ['taxes'] })
      toast.success('Pajak berhasil ditambahkan.')
      context?.setOpen(null)
      onSuccess?.(data)
    },
    onError: () => {
      toast.dismiss('taxes-toast')
      toast.error('Pajak gagal ditambahkan.')
    },
  })
}

export function useUpdateTaxMutation(onSuccess?: (data: Tax) => void) {
  const context = useContext(TaxesContext)

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: UpdateTaxesFormData) => {
      const response = await apiClient.patch(
        `taxes/${credentials.id}`,
        credentials
      )
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'taxes-toast' })
    },
    onSuccess: async (data) => {
      toast.dismiss('taxes-toast')
      await queryClient.invalidateQueries({ queryKey: ['taxes'] })
      toast.success('Pajak berhasil diubah.')
      context?.setOpen(null)
      onSuccess?.(data)
    },
    onError: () => {
      toast.dismiss('taxes-toast')
      toast.error('Pajak gagal diubah.')
    },
  })
}

export function useDeleteTaxMutation() {
  const { setOpen } = useTaxes()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: DeleteTaxesFormData) => {
      const response = await apiClient.delete(`taxes/${credentials.id}`)

      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'taxes-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('taxes-toast')
      await queryClient.invalidateQueries({ queryKey: ['taxes'] })
      toast.success('Pajak berhasil dihapus.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('taxes-toast')
      toast.error('Pajak gagal dihapus.')
    },
  })
}

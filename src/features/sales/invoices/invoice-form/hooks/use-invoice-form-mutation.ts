import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import type {
  CreateInvoiceFormData,
  UpdateInvoiceFormData,
} from '../types/invoice-form.schema'

export function useCreateInvoiceMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: CreateInvoiceFormData) => {
      const response = await apiClient.post(`sales-invoices`, credentials)
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'invoices-form-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('invoices-form-toast')
      await queryClient.invalidateQueries({ queryKey: ['invoice-list'] })
      toast.success('Invoice berhasil ditambahkan.')
      history.back()
    },
    onError: () => {
      toast.dismiss('invoices-form-toast')
      toast.error('Invoice gagal ditambahkan.')
    },
  })
}

export function useUpdateInvoiceMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: UpdateInvoiceFormData) => {
      const response = await apiClient.patch(
        `sales-invoices/${credentials.id}`,
        credentials
      )
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'invoices-form-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('invoices-form-toast')
      await queryClient.invalidateQueries({ queryKey: ['invoice-list'] })
      toast.success('Invoice berhasil diubah.')
      history.back()
    },
    onError: () => {
      toast.dismiss('invoices-form-toast')
      toast.error('Invoice gagal diubah.')
    },
  })
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { FinanceNumberType } from '@/types'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import type {
  CreateInvoiceFormData,
  UpdateInvoiceFormData,
} from '../types/invoice-form.schema'

export function useGenerateNextNumber() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (type: FinanceNumberType) => {
      const response = await apiClient.post(`auto-numbering/generate/${type}`)
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'invoices-form-toast' })
    },
    onSuccess: async (_) => {
      await queryClient.invalidateQueries({
        queryKey: ['auto-numbering'],
      })
      toast.dismiss('invoices-form-toast')
    },
    onError: () => {
      toast.error('Gagal generate nomor seterusnya.')
    },
  })
}

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
      await queryClient.invalidateQueries({
        queryKey: ['sales-invoice-lists', 'sales-invoice-list'],
      })
      toast.success('Tagihan Penjualan berhasil ditambahkan.')
    },
    onError: () => {
      toast.dismiss('invoices-form-toast')
      toast.error('Tagihan Penjualan gagal ditambahkan.')
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
      await queryClient.invalidateQueries({
        queryKey: ['sales-invoice-lists', 'sales-invoice-list'],
      })
      toast.success('Tagihan Penjualan berhasil diubah.')
    },
    onError: () => {
      toast.dismiss('invoices-form-toast')
      toast.error('Tagihan Penjualan gagal diubah.')
    },
  })
}

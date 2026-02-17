import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import type {
  DeleteSalesInvoiceFormData,
  InvoicePaymentsFormData,
} from '../types/invoice-payments.schema'

export function useCreateInvoicePaymentMutation(invoiceId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: InvoicePaymentsFormData) => {
      const response = await apiClient.post(
        `sales-invoices/${invoiceId}/payments`,
        data
      )
      return response.data
    },
    onMutate: () => {
      toast.loading('Processing payment...', { id: 'invoice-payment-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('invoice-payment-toast')
      await queryClient.invalidateQueries({
        queryKey: ['invoice-detail', invoiceId],
      })
      await queryClient.invalidateQueries({ queryKey: ['invoice-list'] })
      toast.success('Pembayaran berhasil dilakukan.')
    },
    onError: () => {
      toast.dismiss('invoice-payment-toast')
      toast.error('Gagal melakukan pembayaran.')
    },
  })
}

export function useDeleteSalesInvoiceMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: DeleteSalesInvoiceFormData) => {
      const response = await apiClient.post(
        `/sales-invoices/bulk-delete`,
        credentials
      )

      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'invoice-detail-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('invoice-detail-toast')
      await queryClient.invalidateQueries({ queryKey: ['invoice-list'] })
      toast.success('Invoice berhasil dihapus.')
    },
    onError: () => {
      toast.dismiss('invoice-detail-toast')
      toast.error('Invoice gagal dihapus.')
    },
  })
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import type {
  DeleteInvoiceFormData,
} from '../types/invoice.schema'
import { useInvoiceLists } from '../components/invoice-list-provider'

export function useDeleteInvoiceMutation() {
  const { setOpen } = useInvoiceLists()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: DeleteInvoiceFormData) => {
      const response = await apiClient.delete(`invoices/${credentials.id}`)

      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'invoices-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('invoices-toast')
      await queryClient.invalidateQueries({ queryKey: ['invoices'] })
      toast.success('Tagihan berhasil dihapus.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('invoices-toast')
      toast.error('Tagihan gagal dihapus.')
    },
  })
}

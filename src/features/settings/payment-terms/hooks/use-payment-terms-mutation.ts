import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { usePaymentTerms } from '../components/payment-terms-provider'
import {
  type CreatePaymentTermsFormData,
  type UpdatePaymentTermsFormData,
  type DeletePaymentTermsFormData,
} from '../types/payment-terms.schema'

export function useCreatePaymentTermMutation() {
  const { setOpen } = usePaymentTerms()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: CreatePaymentTermsFormData) => {
      const response = await apiClient.post(`payment-terms`, credentials)
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'payment-terms-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('payment-terms-toast')
      await queryClient.invalidateQueries({ queryKey: ['payment-terms'] })
      toast.success('Termin Pembayaran berhasil ditambahkan.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('payment-terms-toast')
      toast.error('Termin Pembayaran gagal ditambahkan.')
    },
  })
}

export function useUpdatePaymentTermMutation() {
  const { setOpen } = usePaymentTerms()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: UpdatePaymentTermsFormData) => {
      const response = await apiClient.patch(
        `payment-terms/${credentials.id}`,
        credentials
      )
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'payment-terms-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('payment-terms-toast')
      await queryClient.invalidateQueries({ queryKey: ['payment-terms'] })
      toast.success('Termin Pembayaran berhasil diubah.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('payment-terms-toast')
      toast.error('Termin Pembayaran gagal diubah.')
    },
  })
}

export function useDeletePaymentTermMutation() {
  const { setOpen } = usePaymentTerms()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: DeletePaymentTermsFormData) => {
      const response = await apiClient.delete(`payment-terms/${credentials.id}`)

      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'payment-terms-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('payment-terms-toast')
      await queryClient.invalidateQueries({ queryKey: ['payment-terms'] })
      toast.success('Termin Pembayaran berhasil dihapus.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('payment-terms-toast')
      toast.error('Termin Pembayaran gagal dihapus.')
    },
  })
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import type { CashBankFormFormData } from '../types/cash-bank-form.schema'

export function useCreateSpendMoneyMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: CashBankFormFormData) => {
      const response = await apiClient.post('cash-bank/spend', data)
      return response.data
    },
    onMutate: () => {
      toast.loading('Menyimpan transaksi...', { id: 'cash-bank-form-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('cash-bank-form-toast')
      await queryClient.invalidateQueries({ queryKey: ['cash-bank-list'] })
      await queryClient.invalidateQueries({ queryKey: ['cash-bank-overview'] })
      toast.success('Transaksi pengeluaran dana berhasil ditambahkan.')
    },
    onError: (error: any) => {
      toast.dismiss('cash-bank-form-toast')
      const message =
        error.response?.data?.message || 'Transaksi gagal ditambahkan.'
      toast.error(message)
    },
  })
}

export function useCreateReceiveMoneyMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: CashBankFormFormData) => {
      const response = await apiClient.post('cash-bank/receive', data)
      return response.data
    },
    onMutate: () => {
      toast.loading('Menyimpan transaksi...', { id: 'cash-bank-form-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('cash-bank-form-toast')
      await queryClient.invalidateQueries({ queryKey: ['cash-bank-list'] })
      await queryClient.invalidateQueries({ queryKey: ['cash-bank-overview'] })
      toast.success('Transaksi penerimaan dana berhasil ditambahkan.')
    },
    onError: (error: any) => {
      toast.dismiss('cash-bank-form-toast')
      const message =
        error.response?.data?.message || 'Transaksi gagal ditambahkan.'
      toast.error(message)
    },
  })
}

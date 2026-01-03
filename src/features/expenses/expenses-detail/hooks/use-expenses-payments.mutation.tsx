import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import type { ExpensesPaymentsFormData } from '../types/expenses-payments.schema'

export function useCreateExpensesPaymentMutation(expenseId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: ExpensesPaymentsFormData) => {
      const response = await apiClient.post(
        `expenses/${expenseId}/payments`,
        data
      )
      return response.data
    },
    onMutate: () => {
      toast.loading('Processing payment...', { id: 'expense-payment-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('expense-payment-toast')
      await queryClient.invalidateQueries({
        queryKey: ['expenses-list', expenseId],
      })
      await queryClient.invalidateQueries({ queryKey: ['expenses-list'] })
      toast.success('Pembayaran berhasil dilakukan.')
    },
    onError: () => {
      toast.dismiss('expense-payment-toast')
      toast.error('Gagal melakukan pembayaran.')
    },
  })
}

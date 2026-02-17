import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { FinanceNumberType } from '@/types'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import type {
  CreateExpenseFormData,
  UpdateExpenseFormData,
} from '../types/expenses-form.schema'

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

export function useCreateExpenseMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: CreateExpenseFormData) => {
      const response = await apiClient.post(`expenses`, credentials)
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'invoices-form-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('invoices-form-toast')
      await queryClient.invalidateQueries({ queryKey: ['expenses-list'] })
      toast.success('Invoice berhasil ditambahkan.')
    },
    onError: () => {
      toast.dismiss('invoices-form-toast')
      toast.error('Invoice gagal ditambahkan.')
    },
  })
}

export function useUpdateExpenseMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: UpdateExpenseFormData) => {
      const response = await apiClient.patch(
        `expenses/${credentials.id}`,
        credentials
      )
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'invoices-form-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('invoices-form-toast')
      await queryClient.invalidateQueries({ queryKey: ['expenses-list'] })
      toast.success('Invoice berhasil diubah.')
    },
    onError: () => {
      toast.dismiss('invoices-form-toast')
      toast.error('Invoice gagal diubah.')
    },
  })
}

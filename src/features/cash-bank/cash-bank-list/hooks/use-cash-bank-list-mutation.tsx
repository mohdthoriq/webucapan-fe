import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { useCashBankLists } from '../components/cash-bank-list-provider'
import { type CreateCashBankListFormData } from '../types/cash-bank-list.schema'

export function useCreateCashBankListMutation() {
  const { setOpen, paginationParams } = useCashBankLists()
  const navigate = useNavigate()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: CreateCashBankListFormData) => {
      const response = await apiClient.post(`cash-bank/transfer`, credentials)
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'cash-bank-lists-toast' })
    },
    onSuccess: async (data) => {
      toast.dismiss('cash-bank-lists-toast')
      await queryClient.invalidateQueries({
        queryKey: ['cash-bank-list', 'cash-bank-overview'],
      })
      toast.success('Transfer dana berhasil ditambahkan')
      setOpen(null)

      // Navigate to detail page with transaction ID and account ID
      navigate({
        to: '/cash-bank/detail',
        search: {
          currentRowId: data.data.id,
          accountId: paginationParams?.id,
        },
      })
    },
    onError: () => {
      toast.dismiss('cash-bank-lists-toast')
      toast.error('Transfer dana gagal ditambahkan')
    },
  })
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { useCashBankLists } from '../components/cash-bank-list-provider'
import { type CreateCashBankListFormData } from '../types/cash-bank-list.schema'

export function useCreateCashBankListMutation() {
  const { setOpen } = useCashBankLists()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: CreateCashBankListFormData) => {
      const response = await apiClient.post(`cash-bank/transfer`, credentials)
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'cash-bank-lists-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('cash-bank-lists-toast')
      await queryClient.invalidateQueries({ queryKey: ['cash-bank-lists', 'cash-bank-list', 'cash-bank-overview'] })
      toast.success('Transfer dana berhasil ditambahkan')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('cash-bank-lists-toast')
      toast.error('Transfer dana gagal ditambahkan')
    },
  })
}

// export function useUpdateAccountCategoryMutation() {
//   const { setOpen } = useCashBankLists()

//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: async (credentials: UpdateAccountCategoryFormData) => {
//       const response = await apiClient.patch(
//         `account-categories/${credentials.id}`,
//         credentials
//       )
//       return response.data
//     },
//     onMutate: () => {
//       toast.loading('Loading...', { id: 'account-categories-toast' })
//     },
//     onSuccess: async (_) => {
//       toast.dismiss('account-categories-toast')
//       await queryClient.invalidateQueries({ queryKey: ['account-categories'] })
//       toast.success('Kategori akun berhasil diubah.')
//       setOpen(null)
//     },
//     onError: () => {
//       toast.dismiss('account-categories-toast')
//       toast.error('Kategori akun gagal diubah.')
//     },
//   })
// }

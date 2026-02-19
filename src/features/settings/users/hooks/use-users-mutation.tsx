import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { QUERY_KEY } from '@/constants/query-key'
import { useUsers } from '../components/users-provider'
import type { CreateUserFormData } from '../types/users.schema'

export function useCreateUserMutation() {
  const { setOpen } = useUsers()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: CreateUserFormData) => {
      const response = await apiClient.post(`/users/invite`, credentials)
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'users-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('users-toast')
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USERS] })
      toast.success('Pengguna berhasil diundang.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('users-toast')
      toast.error('Pengguna gagal diundang.')
    },
  })
}

// export function useUpdateAccountMutation() {
//   const { setOpen } = useAccounts()

//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: async (credentials: UpdateAccountFormData) => {
//       const response = await apiClient.patch(
//         `accounts/${credentials.id}`,
//         credentials
//       )
//       return response.data
//     },
//     onMutate: () => {
//       toast.loading('Loading...', { id: 'accounts-toast' })
//     },
//     onSuccess: async (_) => {
//       toast.dismiss('accounts-toast')
//       await queryClient.invalidateQueries({ queryKey: ['accounts'] })
//       toast.success('Akun berhasil diubah.')
//       setOpen(null)
//     },
//     onError: () => {
//       toast.dismiss('accounts-toast')
//       toast.error('Akun gagal diubah.')
//     },
//   })
// }

// export function useDeleteAccountMutation() {
//   const { setOpen } = useAccounts()

//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: async (credentials: DeleteAccountFormData) => {
//       const response = await apiClient.delete(`accounts/${credentials.id}`)

//       return response.data
//     },
//     onMutate: () => {
//       toast.loading('Loading...', { id: 'accounts-toast' })
//     },
//     onSuccess: async (_) => {
//       toast.dismiss('accounts-toast')
//       await queryClient.invalidateQueries({ queryKey: ['accounts'] })
//       toast.success('Akun berhasil dihapus.')
//       setOpen(null)
//     },
//     onError: () => {
//       toast.dismiss('accounts-toast')
//       toast.error('Akun gagal dihapus.')
//     },
//   })
// }

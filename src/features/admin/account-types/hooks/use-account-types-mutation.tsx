import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import {
  type CreateAccountTypeFormData,
  type UpdateAccountTypeFormData,
  type DeleteAccountTypeFormData,
} from '../types/account-types.schema'
import { useAccountTypes } from '../components/account-types-provider'

export function useCreateAccountTypeMutation() {
  const { setOpen } = useAccountTypes()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: CreateAccountTypeFormData) => {
      const response = await apiClient.post(`account-types`, credentials)
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'account-types-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('account-types-toast')
      await queryClient.invalidateQueries({ queryKey: ['account-types'] })
      toast.success('Tipe Akun berhasil ditambahkan.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('account-types-toast')
      toast.error('Tipe Akun gagal ditambahkan.')
    },
  })
}

export function useUpdateAccountTypeMutation() {
  const { setOpen } = useAccountTypes()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: UpdateAccountTypeFormData) => {
      const response = await apiClient.patch(
        `account-types/${credentials.id}`,
        credentials
      )
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'account-types-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('account-types-toast')
      await queryClient.invalidateQueries({ queryKey: ['account-types'] })
      toast.success('Tipe Akun berhasil diubah.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('account-types-toast')
      toast.error('Tipe Akun gagal diubah.')
    },
  })
}

export function useDeleteAccountTypeMutation() {
  const { setOpen } = useAccountTypes()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: DeleteAccountTypeFormData) => {
      const response = await apiClient.delete(`account-types/${credentials.id}`)

      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'account-types-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('account-types-toast')
      await queryClient.invalidateQueries({ queryKey: ['account-types'] })
      toast.success('Tipe Akun berhasil dihapus.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('account-types-toast')
      toast.error('Tipe Akun gagal dihapus.')
    },
  })
}

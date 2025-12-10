import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import {
  type CreateAccountCategoryFormData,
  type UpdateAccountCategoryFormData,
  type DeleteAccountCategoryFormData,
} from '@/features/account/account-categories/types/account-categories.schema'
import { useAccountCategories } from '../components/account-categories-provider'

export function useCreateAccountCategoryMutation() {
  const { setOpen } = useAccountCategories()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: CreateAccountCategoryFormData) => {
      const response = await apiClient.post(`account-categories`, credentials)
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'account-categories-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('account-categories-toast')
      await queryClient.invalidateQueries({ queryKey: ['account-categories'] })
      toast.success('Kategori akun berhasil ditambahkan.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('account-categories-toast')
      toast.error('Kategori akun gagal ditambahkan.')
    },
  })
}

export function useUpdateAccountCategoryMutation() {
  const { setOpen } = useAccountCategories()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: UpdateAccountCategoryFormData) => {
      const response = await apiClient.patch(
        `account-categories/${credentials.id}`,
        credentials
      )
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'account-categories-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('account-categories-toast')
      await queryClient.invalidateQueries({ queryKey: ['account-categories'] })
      toast.success('Kategori akun berhasil diubah.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('account-categories-toast')
      toast.error('Kategori akun gagal diubah.')
    },
  })
}

export function useDeleteAccountCategoryMutation() {
  const { setOpen } = useAccountCategories()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: DeleteAccountCategoryFormData) => {
      const response = await apiClient.delete(`account-categories/${credentials.id}`)

      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'account-categories-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('account-categories-toast')
      await queryClient.invalidateQueries({ queryKey: ['account-categories'] })
      toast.success('Kategori akun berhasil dihapus.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('account-categories-toast')
      toast.error('Kategori akun gagal dihapus.')
    },
  })
}

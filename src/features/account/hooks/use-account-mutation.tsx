import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import {
  type CreateContactFormData,
  type UpdateContactFormData,
  type DeleteContactFormData,
} from '@/features/contacts/types/contacts.schema'
import { useAccounts } from '../components/account-provider'

export function useCreateAccountMutation() {
  const { setOpen } = useAccounts()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: CreateContactFormData) => {
      const response = await apiClient.post(`accounts`, credentials)
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'accounts-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('accounts-toast')
      await queryClient.invalidateQueries({ queryKey: ['accounts'] })
      toast.success('Akun berhasil ditambahkan.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('accounts-toast')
      toast.error('Akun gagal ditambahkan.')
    },
  })
}

export function useUpdateAccountMutation() {
  const { setOpen } = useAccounts()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: UpdateContactFormData) => {
      const response = await apiClient.patch(
        `accounts/${credentials.id}`,
        credentials
      )
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'accounts-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('accounts-toast')
      await queryClient.invalidateQueries({ queryKey: ['accounts'] })
      toast.success('Akun berhasil diubah.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('accounts-toast')
      toast.error('Akun gagal diubah.')
    },
  })
}

export function useDeleteAccountMutation() {
  const { setOpen } = useAccounts()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: DeleteContactFormData) => {
      const response = await apiClient.delete(`accounts/${credentials.id}`)

      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'accounts-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('accounts-toast')
      await queryClient.invalidateQueries({ queryKey: ['accounts'] })
      toast.success('Akun berhasil dihapus.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('accounts-toast')
      toast.error('Akun gagal dihapus.')
    },
  })
}

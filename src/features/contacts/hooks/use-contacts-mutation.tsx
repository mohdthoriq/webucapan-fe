import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import {
  type CreateContactFormData,
  type UpdateContactFormData,
  type DeleteContactFormData,
} from '@/features/contacts/types/contacts.schema'
import { useContacts } from '../components/contacts-provider'

export function useCreateContactMutation() {
  const { setOpen } = useContacts()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: CreateContactFormData) => {
      const response = await apiClient.post(`contacts`, credentials)
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'contacts-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('contacts-toast')
      await queryClient.invalidateQueries({ queryKey: ['contacts'] })
      toast.success('Kontak berhasil ditambahkan.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('contacts-toast')
      toast.error('Kontak gagal ditambahkan.')
    },
  })
}

export function useUpdateContactMutation() {
  const { setOpen } = useContacts()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: UpdateContactFormData) => {
      const response = await apiClient.patch(
        `contacts/${credentials.id}`,
        credentials
      )
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'contacts-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('contacts-toast')
      await queryClient.invalidateQueries({ queryKey: ['contacts'] })
      toast.success('Kontak berhasil diubah.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('contacts-toast')
      toast.error('Satuan gagal diubah.')
    },
  })
}

export function useDeleteContactMutation() {
  const { setOpen } = useContacts()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: DeleteContactFormData) => {
      const response = await apiClient.delete(`contacts/${credentials.id}`)

      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'contacts-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('contacts-toast')
      await queryClient.invalidateQueries({ queryKey: ['contacts'] })
      toast.success('Kontak berhasil dihapus.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('contacts-toast')
      toast.error('Kontak gagal dihapus.')
    },
  })
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { useSubscriptions } from '../components/subscriptions-provider'
import {
  type CreateSubscriptionFormData,
  type UpdateSubscriptionFormData,
  type DeleteSubscriptionFormData,
} from '../types/subscriptions.schema'

export function useCreateSubscriptionMutation() {
  const { setOpen } = useSubscriptions()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: CreateSubscriptionFormData) => {
      const response = await apiClient.post(
        `subscriptions/set-company`,
        credentials
      )
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'subscriptions-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('subscriptions-toast')
      await queryClient.invalidateQueries({
        queryKey: ['subscriptions-active'],
      })
      toast.success('Subscription berhasil ditambahkan.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('subscriptions-toast')
      toast.error('Subscription gagal ditambahkan.')
    },
  })
}

export function useUpdateSubscriptionMutation() {
  const { setOpen } = useSubscriptions()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: UpdateSubscriptionFormData) => {
      const response = await apiClient.patch(
        `subscriptions/${credentials.id}`,
        credentials
      )
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'subscriptions-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('subscriptions-toast')
      await queryClient.invalidateQueries({ queryKey: ['subscriptions'] })
      toast.success('Subscription berhasil diubah.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('subscriptions-toast')
      toast.error('Subscription gagal diubah.')
    },
  })
}

export function useDeleteSubscriptionMutation() {
  const { setOpen } = useSubscriptions()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: DeleteSubscriptionFormData) => {
      const response = await apiClient.delete(`subscriptions/${credentials.id}`)

      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'subscriptions-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('subscriptions-toast')
      await queryClient.invalidateQueries({ queryKey: ['subscriptions'] })
      toast.success('Subscription berhasil dihapus.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('subscriptions-toast')
      toast.error('Subscription gagal dihapus.')
    },
  })
}

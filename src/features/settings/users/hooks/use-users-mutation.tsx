import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { QUERY_KEY } from '@/constants/query-key'
import { useUsers } from '../components/users-provider'
import type {
  CreateUserFormData,
  DeleteUserFormData,
  UpdateUserStatusFormData,
} from '../types/users.schema'

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

export function useUpdateUserStatusMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: UpdateUserStatusFormData) => {
      const response = await apiClient.patch(`/users/${data.id}/status`, {
        is_active: data.is_active,
      })
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'users-status-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('users-status-toast')
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USERS] })
      toast.success('Status pengguna berhasil diubah.')
    },
    onError: () => {
      toast.dismiss('users-status-toast')
      toast.error('Gagal mengubah status pengguna.')
    },
  })
}

export function useDeleteUserMutation() {
  const { setOpen } = useUsers()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: DeleteUserFormData) => {
      const response = await apiClient.delete(`/users/${data.id}`)
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'users-delete-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('users-delete-toast')
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USERS] })
      toast.success('Pengguna berhasil dihapus.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('users-delete-toast')
      toast.error('Gagal menghapus pengguna.')
    },
  })
}

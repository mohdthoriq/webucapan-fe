import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { usePackages } from '../components/packages-provider'
import {
  type CreatePackageFormData,
  type UpdatePackageFormData,
  type DeletePackageFormData,
} from '../types/packages.schema'

export function useCreatePackageMutation() {
  const { setOpen } = usePackages()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: CreatePackageFormData) => {
      const response = await apiClient.post(`subscriptions/plans`, credentials)
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'packages-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('packages-toast')
      await queryClient.invalidateQueries({ queryKey: ['packages'] })
      toast.success('Plan berhasil ditambahkan.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('packages-toast')
      toast.error('Plan gagal ditambahkan.')
    },
  })
}

export function useUpdatePackageMutation() {
  const { setOpen } = usePackages()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: UpdatePackageFormData) => {
      const response = await apiClient.patch(
        `subscriptions/plans/${credentials.id}`,
        credentials
      )
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'packages-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('packages-toast')
      await queryClient.invalidateQueries({ queryKey: ['packages'] })
      toast.success('Plan berhasil diubah.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('packages-toast')
      toast.error('Plan gagal diubah.')
    },
  })
}

export function useDeletePackageMutation() {
  const { setOpen } = usePackages()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: DeletePackageFormData) => {
      const response = await apiClient.delete(
        `subscriptions/plans/${credentials.id}`
      )

      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'packages-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('packages-toast')
      await queryClient.invalidateQueries({ queryKey: ['packages'] })
      toast.success('Plan berhasil dihapus.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('packages-toast')
      toast.error('Plan gagal dihapus.')
    },
  })
}

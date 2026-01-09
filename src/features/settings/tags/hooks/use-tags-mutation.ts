import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { useTags } from '../components/tags-provider'
import type {
  CreateTagFormData,
  DeleteTagFormData,
  UpdateTagFormData,
} from '../types/tags.schema'

export function useCreateTagMutation() {
  const { setOpen } = useTags()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: CreateTagFormData) => {
      const response = await apiClient.post(`tags`, credentials)
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'tags-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('tags-toast')
      await queryClient.invalidateQueries({ queryKey: ['tags'] })
      toast.success('Tag berhasil ditambahkan.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('tags-toast')
      toast.error('Tag gagal ditambahkan.')
    },
  })
}

export function useUpdateTagMutation() {
  const { setOpen } = useTags()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: UpdateTagFormData) => {
      const response = await apiClient.patch(
        `tags/${credentials.id}`,
        credentials
      )
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'tags-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('tags-toast')
      await queryClient.invalidateQueries({ queryKey: ['tags'] })
      toast.success('Tag berhasil diubah.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('tags-toast')
      toast.error('Tag gagal diubah.')
    },
  })
}

export function useDeleteTagMutation() {
  const { setOpen } = useTags()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: DeleteTagFormData) => {
      const response = await apiClient.delete(`tags/${credentials.id}`)

      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'tags-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('tags-toast')
      await queryClient.invalidateQueries({ queryKey: ['tags'] })
      toast.success('Tag berhasil dihapus.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('tags-toast')
      toast.error('Tag gagal dihapus.')
    },
  })
}

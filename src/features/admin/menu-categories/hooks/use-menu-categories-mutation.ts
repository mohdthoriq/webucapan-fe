import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { AxiosError } from 'axios'
import { useMenuCategories } from '../components/menu-categories-provider'
import {
  type CreateMenuCategoriesFormData,
  type UpdateMenuCategoriesFormData,
  type DeleteMenuCategoriesFormData,
} from '../types/menu-categories.schema'

export function useCreateMenuCategoryMutation() {
  const { setOpen } = useMenuCategories()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateMenuCategoriesFormData) => {
      const response = await apiClient.post(`menu-categories`, data)
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'menu-categories-toast' })
    },
    onSuccess: async () => {
      toast.dismiss('menu-categories-toast')
      await queryClient.invalidateQueries({ queryKey: ['menu-categories'] })
      toast.success('Kategori menu berhasil ditambahkan.')
      setOpen(null)
    },
    onError: (error: unknown) => {
      toast.dismiss('menu-categories-toast')
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || 'Kategori menu gagal ditambahkan.')
      } else {
        toast.error('Kategori menu gagal ditambahkan.')
      }
    },
  })
}

export function useUpdateMenuCategoryMutation() {
  const { setOpen } = useMenuCategories()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateMenuCategoriesFormData) => {
      const response = await apiClient.patch(
        `menu-categories/${data.id}`,
        data
      )
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'menu-categories-toast' })
    },
    onSuccess: async () => {
      toast.dismiss('menu-categories-toast')
      await queryClient.invalidateQueries({ queryKey: ['menu-categories'] })
      toast.success('Kategori menu berhasil diubah.')
      setOpen(null)
    },
    onError: (error: unknown) => {
      toast.dismiss('menu-categories-toast')
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || 'Kategori menu gagal diubah.')
      } else {
        toast.error('Kategori menu gagal diubah.')
      }
    },
  })
}

export function useDeleteMenuCategoryMutation() {
  const { setOpen } = useMenuCategories()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: DeleteMenuCategoriesFormData) => {
      const response = await apiClient.delete(`menu-categories/${data.id}`)
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'menu-categories-toast' })
    },
    onSuccess: async () => {
      toast.dismiss('menu-categories-toast')
      await queryClient.invalidateQueries({ queryKey: ['menu-categories'] })
      toast.success('Kategori menu berhasil dihapus.')
      setOpen(null)
    },
    onError: (error: unknown) => {
      toast.dismiss('menu-categories-toast')
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || 'Kategori menu gagal dihapus.')
      } else {
        toast.error('Kategori menu gagal dihapus.')
      }
    },
  })
}

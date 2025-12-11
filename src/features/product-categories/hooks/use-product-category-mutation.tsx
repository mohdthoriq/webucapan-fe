import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { useProductCategories } from '../components/product-category-provider'
import type {
  CreateProductCategoryFormData,
  DeleteProductCategoryFormData,
  UpdateProductCategoryFormData,
} from '../types/product-category.schema'

export function useCreateProductCategoryMutation() {
  const { setOpen } = useProductCategories()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: CreateProductCategoryFormData) => {
      const response = await apiClient.post(`product-categories`, credentials)
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'product-categories-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('product-categories-toast')
      await queryClient.invalidateQueries({ queryKey: ['product-categories'] })
      toast.success('Kategori produk berhasil ditambahkan.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('product-categories-toast')
      toast.error('Kategori produk gagal ditambahkan.')
    },
  })
}

export function useUpdateProductCategoryMutation() {
  const { setOpen } = useProductCategories()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: UpdateProductCategoryFormData) => {
      const response = await apiClient.patch(
        `product-categories/${credentials.id}`,
        credentials
      )
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'product-categories-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('product-categories-toast')
      await queryClient.invalidateQueries({ queryKey: ['product-categories'] })
      toast.success('Kategori produk berhasil diubah.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('product-categories-toast')
      toast.error('Kategori produk gagal diubah.')
    },
  })
}

export function useDeleteProductCategoryMutation() {
  const { setOpen } = useProductCategories()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: DeleteProductCategoryFormData) => {
      const response = await apiClient.delete(
        `product-categories/${credentials.id}`
      )

      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'product-categories-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('product-categories-toast')
      await queryClient.invalidateQueries({ queryKey: ['product-categories'] })
      toast.success('Kategori produk berhasil dihapus.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('product-categories-toast')
      toast.error('Kategori produk gagal dihapus.')
    },
  })
}

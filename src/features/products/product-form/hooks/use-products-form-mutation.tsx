import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import type {
  CreateProductFormData,
  UpdateProductFormData,
} from '../types/product-form.schema'

export function useCreateProductMutation() {

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: CreateProductFormData) => {
      const response = await apiClient.post(`products/with-images`, credentials)
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'products-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('products-toast')
      await queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success('Produk berhasil ditambahkan.')
    },
    onError: () => {
      toast.dismiss('products-toast')
      toast.error('Produk gagal ditambahkan.')
    },
  })
}

export function useUpdateProductMutation() {

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: UpdateProductFormData) => {
      const response = await apiClient.patch(
        `products/${credentials.id}/with-images`,
        credentials
      )
      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'products-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('products-toast')
      await queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success('Produk berhasil diperbarui.')
    },
    onError: () => {
      toast.dismiss('products-toast')
      toast.error('Produk gagal diperbarui.')
    },
  })
}

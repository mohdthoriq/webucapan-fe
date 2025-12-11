import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { useProducts } from '../../product-list/components/products-provider'
import type {
  CreateProductFormData,
  UpdateProductFormData,
} from '../types/product-form.schema'

export function useCreateProductMutation() {
  const { setOpen } = useProducts()

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
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('products-toast')
      toast.error('Produk gagal ditambahkan.')
    },
  })
}

export function useUpdateProductMutation() {
  const { setOpen } = useProducts()

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
      toast.success('Produk berhasil diubah.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('products-toast')
      toast.error('Produk gagal diubah.')
    },
  })
}

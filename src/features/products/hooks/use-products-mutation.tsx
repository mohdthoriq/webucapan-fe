import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import type {
  CreateProductFormData,
  UpdateProductFormData,
  DeleteProductFormData,
} from '../types/products.schema'
import { useProducts } from '../components/products-provider'

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

export function useDeleteProductMutation() {
  const { setOpen } = useProducts()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: DeleteProductFormData) => {
      const response = await apiClient.delete(`products/${credentials.id}`)

      return response.data
    },
    onMutate: () => {
      toast.loading('Loading...', { id: 'products-toast' })
    },
    onSuccess: async (_) => {
      toast.dismiss('products-toast')
      await queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success('Produk berhasil dihapus.')
      setOpen(null)
    },
    onError: () => {
      toast.dismiss('products-toast')
      toast.error('Produk gagal dihapus.')
    },
  })
}

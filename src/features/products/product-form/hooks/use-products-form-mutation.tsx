import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import apiClientFormData from '@/lib/api-client-form-data'
import type { CreateProductFormData } from '../types/product-form.schema'

export function useUploadImageProduct() {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await apiClientFormData.post(`products/images`, formData)
      return response.data
    },
    onError: () => {
      toast.error('Gambar produk gagal ditambahkan.')
    },
  })
}

export function useCreateProductMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: CreateProductFormData) => {
      const response = await apiClient.post(`products`, data)
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
    mutationFn: async ({
      id,
      data,
    }: {
      id: string
      data: CreateProductFormData
    }) => {
      const response = await apiClient.patch(`products/${id}/`, data)
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

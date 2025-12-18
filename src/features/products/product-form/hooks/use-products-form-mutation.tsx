import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClientFormData from '@/lib/api-client-form-data'

export function useCreateProductMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await apiClientFormData.post(`products/with-images`, formData)
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
      formData,
    }: {
      id: string
      formData: FormData
    }) => {
      const response = await apiClientFormData.patch(
        `products/${id}/with-images`,
        formData
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

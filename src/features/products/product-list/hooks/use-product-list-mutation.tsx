import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useProducts } from "../components/products-provider"
import apiClient from "@/lib/api-client"
import type { DeleteProductFormData } from "../types/products-list.schema"
import { toast } from "sonner"

export function useDeleteProductMutation() {
  const { setOpen } = useProducts()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: DeleteProductFormData) => {
      const response = await apiClient.delete(`/products/${credentials.id}`)

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

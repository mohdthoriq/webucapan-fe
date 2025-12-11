import { useQuery } from '@tanstack/react-query'
import type { PaginationApiResponse, Product } from '@/types'
import apiClient from '@/lib/api-client'

interface ProductsQueryParams {
  page?: number
  limit?: number
  name?: string
}

export function useProductsQuery(params?: ProductsQueryParams) {

  return useQuery({
    queryKey: [
      'products',
      params?.page,
      params?.limit,
      params?.name,
    ],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        ...(params?.page ? { page: params.page.toString() } : {}),
        ...(params?.limit ? { limit: params.limit.toString() } : {}),
        ...(params?.name ? { name: params.name } : {}),
      })

      const url = queryParams.toString()
        ? `/products?${queryParams.toString()}`
        : '/products'
      const response =
        await apiClient.get<PaginationApiResponse<Product>>(url)

      return response.data ?? []
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}

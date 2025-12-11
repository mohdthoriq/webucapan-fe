import { useQuery } from '@tanstack/react-query'
import type { PaginationApiResponse, ProductCategory } from '@/types'
import apiClient from '@/lib/api-client'

interface ProductCategoryQueryParams {
  page?: number
  limit?: number
  company_id?: string
  name?: string
}

export function useProductCategoryQuery(params?: ProductCategoryQueryParams) {

  return useQuery({
    queryKey: [
      'product-categories',
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
        ? `/product-categories?${queryParams.toString()}`
        : '/product-categories'
      const response =
        await apiClient.get<PaginationApiResponse<ProductCategory>>(url)

      return response.data ?? []
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}

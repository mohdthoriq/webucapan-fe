import { useQuery } from '@tanstack/react-query'
import type { AccountCategory, PaginationApiResponse } from '@/types'
import apiClient from '@/lib/api-client'

interface AccountCategoryQueryParams {
  page?: number
  limit?: number
  name?: string
  type_id?: string
}

export function useAccountCategoriesQuery(params?: AccountCategoryQueryParams) {
  return useQuery({
    queryKey: [
      'account-categories',
      params?.page,
      params?.limit,
      params?.name,
      params?.type_id,
    ],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        ...(params?.page ? { page: params.page.toString() } : {}),
        ...(params?.limit ? { limit: params.limit.toString() } : {}),
        ...(params?.name ? { name: params.name } : {}),
        ...(params?.type_id ? { type_id: params.type_id } : {}),
      })

      const url = queryParams.toString()
        ? `/account-categories?${queryParams.toString()}`
        : '/account-categories'
      const response =
        await apiClient.get<PaginationApiResponse<AccountCategory>>(url)

      return response.data ?? []
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}

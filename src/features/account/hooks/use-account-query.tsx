import { useQuery } from '@tanstack/react-query'
import type { Account, PaginationApiResponse } from '@/types'
import apiClient from '@/lib/api-client'

interface AccountQueryParams {
  page?: number
  limit?: number
  name?: string
  category_id?: string
}

export function useAccountsQuery(params?: AccountQueryParams) {

  return useQuery({
    queryKey: [
      'accounts',
      params?.page,
      params?.limit,
      params?.name,
      params?.category_id,
    ],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        ...(params?.page ? { page: params.page.toString() } : {}),
        ...(params?.limit ? { limit: params.limit.toString() } : {}),
        ...(params?.name ? { name: params.name } : {}),
        ...(params?.category_id ? { category_id: params.category_id } : {}),
      })

      const url = queryParams.toString()
        ? `/accounts?${queryParams.toString()}`
        : '/accounts'
      const response =
        await apiClient.get<PaginationApiResponse<Account>>(url)

      return response.data ?? []
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}

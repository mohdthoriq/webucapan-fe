import { useQuery } from '@tanstack/react-query'
import type { AccountType, PaginationApiResponse } from '@/types'
import apiClient from '@/lib/api-client'

interface AccountTypesQueryParams {
  page?: number
  limit?: number
  name?: string
}

export function useAccountTypesQuery(params?: AccountTypesQueryParams) {

  return useQuery({
    queryKey: [
      'account-types',
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
        ? `/account-types?${queryParams.toString()}`
        : '/account-types'
      const response =
        await apiClient.get<PaginationApiResponse<AccountType>>(url)

      return response.data ?? []
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}


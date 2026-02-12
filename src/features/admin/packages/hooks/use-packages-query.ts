import { useQuery } from '@tanstack/react-query'
import type { Package, PaginationApiResponse } from '@/types'
import apiClient from '@/lib/api-client'

export interface PackagesQueryParams {
  page?: number
  limit?: number
  name?: string
  order?: 'asc' | 'desc'
  is_active?: boolean
}

export function usePackagesQuery(params?: PackagesQueryParams) {
  return useQuery({
    queryKey: [
      'packages',
      params?.page,
      params?.limit,
      params?.name,
      params?.order,
      params?.is_active,
    ],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        ...(params?.page ? { page: params.page.toString() } : {}),
        ...(params?.limit ? { limit: params.limit.toString() } : {}),
        ...(params?.name ? { name: params.name } : {}),
        ...(params?.order ? { order: params.order } : {}),
        ...(params?.is_active
          ? { is_active: params.is_active.toString() }
          : {}),
      })

      const url = queryParams.toString()
        ? `/subscriptions/plans?${queryParams.toString()}`
        : '/subscriptions/plans'
      const response = await apiClient.get<PaginationApiResponse<Package>>(url)

      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // optional: retry once only
  })
}

import { useQuery } from '@tanstack/react-query'
import type { PaginationApiResponse, Unit } from '@/types'
import { useAuthStore } from '@/stores/auth-store'
import apiClient from '@/lib/api-client'

export interface UnitsQueryParams {
  page?: number
  limit?: number
  company_id?: string
  name?: string
}

export function useUnitsQuery(params?: UnitsQueryParams) {
  const user = useAuthStore((state) => state.auth.user)

  return useQuery({
    queryKey: [
      'units',
      params?.page,
      params?.limit,
      params?.company_id,
      params?.name,
      user?.company?.id,
    ],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        ...(params?.page ? { page: params.page.toString() } : {}),
        ...(params?.limit ? { limit: params.limit.toString() } : {}),
        ...(params?.name ? { name: params.name } : {}),
        company_id: params?.company_id
          ? params.company_id
          : user?.company?.id || '',
      })

      const url = queryParams.toString()
        ? `/units?${queryParams.toString()}`
        : '/units'
      const response = await apiClient.get<PaginationApiResponse<Unit>>(url)

      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // optional: retry once only
  })
}

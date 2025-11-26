import { useQuery } from '@tanstack/react-query'
import { type ApiResponse } from '@/types/global-types/api-response'
import { useAuthStore } from '@/stores/auth-store'
import apiClient from '@/lib/api-client'
import { type Units } from '../types/units-response'

interface RoleSettingsQueryParams {
  page?: number
  limit?: number
  company_id?: string
  name?: string
}

export function useUnitsQuery(params?: RoleSettingsQueryParams) {
  const user = useAuthStore((state) => state.auth.user)

  return useQuery<Units>({
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
        ...(params?.company_id
          ? {
              company_id: params.company_id
                ? params.company_id
                : user?.company?.id,
            }
          : {}),
        ...(params?.name ? { name: params.name } : {}),
      })

      const url = queryParams.toString()
        ? `/units?${queryParams.toString()}`
        : '/units'
      const response = await apiClient.get<ApiResponse<Units>>(url)

      return response.data.data as Units
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // optional: retry once only
  })
}

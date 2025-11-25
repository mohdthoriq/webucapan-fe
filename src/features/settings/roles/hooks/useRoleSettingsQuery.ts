import { useQuery } from '@tanstack/react-query'
import { type ApiResponse } from '@/types/global-types/api-response'
import { useAuthStore } from '@/stores/auth-store'
import apiClient from '@/lib/api-client'
import { type Roles } from '../types/roles-response.type'

interface RoleSettingsQueryParams {
  page?: number
  limit?: number
  company_id?: string
}

export function useRoleSettingsQuery(params?: RoleSettingsQueryParams) {
  const user = useAuthStore((state) => state.auth.user)

  return useQuery<Roles>({
    queryKey: ['role', params?.page, params?.limit, params?.company_id],
    queryFn: async () => {
      const queryParams = new URLSearchParams()

      if (params?.page !== undefined) {
        queryParams.append('page', params.page.toString())
      }
      if (params?.limit !== undefined) {
        queryParams.append('limit', params.limit.toString())
      }
      if (params?.company_id !== undefined) {
        queryParams.append('company_id', params.company_id)
      } else {
        if (user?.company?.id) {
          queryParams.append('company_id', user.company.id)
        }
      }

      const url = queryParams.toString()
        ? `/roles?${queryParams.toString()}`
        : '/roles'
      const response = await apiClient.get<ApiResponse<Roles>>(url)

      return response.data.data as Roles
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // optional: retry once only
  })
}

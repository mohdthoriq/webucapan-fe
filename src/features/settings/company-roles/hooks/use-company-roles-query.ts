import { useQuery } from '@tanstack/react-query'
import type { CompanyRole, PaginationApiResponse } from '@/types'
import { useAuthStore } from '@/stores/auth-store'
import apiClient from '@/lib/api-client'
import { QUERY_KEY } from '@/constants/query-key'

interface RoleSettingsQueryParams {
  page?: number
  limit?: number
  company_id?: string
  name?: string
  is_system_role?: boolean
  order?: 'asc' | 'desc'
}

export function useCompanyRoleSettingsQuery(params?: RoleSettingsQueryParams) {
  const user = useAuthStore((state) => state.auth.user)

  return useQuery({
    queryKey: [
      QUERY_KEY.COMPANY_ROLES,
      params?.page,
      params?.limit,
      params?.company_id,
      params?.name,
      params?.is_system_role,
      params?.order,
    ],
    queryFn: async () => {
      const queryParams = new URLSearchParams()

      if (params?.page !== undefined) {
        queryParams.append('page', params.page.toString())
      }
      if (params?.limit !== undefined) {
        queryParams.append('limit', params.limit.toString())
      }
      if (params?.name !== undefined) {
        queryParams.append('name', params.name)
      }
      if (params?.is_system_role !== undefined) {
        queryParams.append('is_system_role', params.is_system_role.toString())
      }
      if (params?.order !== undefined) {
        queryParams.append('order', params.order)
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
      const response =
        await apiClient.get<PaginationApiResponse<CompanyRole>>(url)

      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // optional: retry once only
  })
}

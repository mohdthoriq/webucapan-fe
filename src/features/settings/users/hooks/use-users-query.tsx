import { useQuery } from '@tanstack/react-query'
import type { PaginationApiResponse, User } from '@/types'
import { useAuthStore } from '@/stores/auth-store'
import apiClient from '@/lib/api-client'
import { QUERY_KEY } from '@/constants/query-key'

interface UsersQueryParams {
  page?: number
  limit?: number
  company_id?: string
  name?: string
}

export function useUsersQuery(params?: UsersQueryParams) {
  const company = useAuthStore((state) => state.auth.user?.company)

  return useQuery({
    queryKey: [
      QUERY_KEY.USERS,
      params?.page,
      params?.limit,
      params?.name,
      params?.company_id ?? company?.id,
    ],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        ...(params?.page ? { page: params.page.toString() } : {}),
        ...(params?.limit ? { limit: params.limit.toString() } : {}),
        ...(params?.name ? { name: params.name } : {}),
      })

      const url = queryParams.toString()
        ? `/users/company/${params?.company_id ? params.company_id : company?.id || ''}?${queryParams.toString()}`
        : `/users/company/${params?.company_id ? params.company_id : company?.id || ''}`
      const response = await apiClient.get<PaginationApiResponse<User>>(url)

      return response.data ?? []
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}

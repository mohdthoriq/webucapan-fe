import { useQuery } from '@tanstack/react-query'
import type { PaginationApiResponse, User } from '@/types'
import apiClient from '@/lib/api-client'

interface UsersQueryParams {
  page?: number
  limit?: number
  company_id?: string
  name?: string
}

export function useUsersQuery(params?: UsersQueryParams) {
  
  return useQuery({
    queryKey: [
      'users',
      params?.page,
      params?.limit,
      params?.name,
      params?.company_id,
    ],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        ...(params?.page ? { page: params.page.toString() } : {}),
        ...(params?.limit ? { limit: params.limit.toString() } : {}),
        ...(params?.name ? { name: params.name } : {}),
        ...(params?.company_id ? { company_id: params.company_id } : {}),
      })

      const url = queryParams.toString()
        ? `/users/company?${queryParams.toString()}`
        : '/users/company'
      const response =
        await apiClient.get<PaginationApiResponse<User>>(url)

      return response.data ?? []
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}

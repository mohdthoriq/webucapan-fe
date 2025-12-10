import { useQuery } from '@tanstack/react-query'
import type { Account, PaginationApiResponse } from '@/types'
import { useAuthStore } from '@/stores/auth-store'
import apiClient from '@/lib/api-client'

interface AccountQueryParams {
  page?: number
  limit?: number
  company_id?: string
  name?: string
}

export function useAccountsQuery(params?: AccountQueryParams) {
  const user = useAuthStore((state) => state.auth.user)

  return useQuery({
    queryKey: [
      'accounts',
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

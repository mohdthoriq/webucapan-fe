import { useQuery } from '@tanstack/react-query'
import type { AccountCategory, PaginationApiResponse } from '@/types'
import { useAuthStore } from '@/stores/auth-store'
import apiClient from '@/lib/api-client'

interface AccountCategoryQueryParams {
  page?: number
  limit?: number
  company_id?: string
  name?: string
}

export function useAccountCategoriesQuery(params?: AccountCategoryQueryParams) {
  const user = useAuthStore((state) => state.auth.user)

  return useQuery({
    queryKey: [
      'account-categories',
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
        ? `/account-categories?${queryParams.toString()}`
        : '/account-categories'
      const response =
        await apiClient.get<PaginationApiResponse<AccountCategory>>(url)

      return response.data ?? []
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}

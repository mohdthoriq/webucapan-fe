import { useQuery } from '@tanstack/react-query'
import type { PaginationApiResponse, Tag } from '@/types'
import apiClient from '@/lib/api-client'

interface RoleSettingsQueryParams {
  page?: number
  limit?: number
  order?: string
  name?: string
}

export function useTagsQuery(params?: RoleSettingsQueryParams) {
  return useQuery({
    queryKey: [
      'tags',
      params?.page,
      params?.limit,
      params?.order,
      params?.name,
    ],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        ...(params?.page ? { page: params.page.toString() } : {}),
        ...(params?.limit ? { limit: params.limit.toString() } : {}),
        ...(params?.name ? { name: params.name } : {}),
        ...(params?.order ? { order: params.order } : {}),
      })

      const url = queryParams.toString()
        ? `/tags?${queryParams.toString()}`
        : '/tags'
      const response = await apiClient.get<PaginationApiResponse<Tag>>(url)

      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // optional: retry once only
  })
}

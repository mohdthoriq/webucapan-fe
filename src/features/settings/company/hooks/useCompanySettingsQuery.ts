import { useQuery } from '@tanstack/react-query'
import type { ApiResponse, Company } from '@/types'
import apiClient from '@/lib/api-client'

export function useCompanySettingsQuery(companyId?: string) {
  return useQuery<Company>({
    queryKey: ['company', companyId],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<Company>>(
        `/companies/${companyId}`
      )
      return response.data.data as Company
    },
    enabled: Boolean(companyId), // only run when companyId existed
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // optional: retry once only
  })
}

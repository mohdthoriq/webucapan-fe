import { useQuery } from '@tanstack/react-query'
import type { Company } from '@/stores/auth-store'
import apiClient from '@/lib/api-client'

export function useCompanySettingsQuery(companyId: string | undefined) {
  return useQuery({
    queryKey: ['company', companyId],
    queryFn: async () => {
      if (!companyId) {
        throw new Error('Company ID is required')
      }
      const response = await apiClient.get<{ data: Company }>(
        `/companies/${companyId}`
      )
      return response.data.data
    },
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

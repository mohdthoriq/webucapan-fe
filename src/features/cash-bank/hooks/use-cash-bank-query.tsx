import { useQuery } from '@tanstack/react-query'
import type { ApiResponse, CashBankOverview } from '@/types'
import apiClient from '@/lib/api-client'

export function useCashBankQuery() {
  return useQuery({
    queryKey: ['cash-bank'],
    queryFn: async () => {
      const url = `/cash-bank`
      const response = await apiClient.get<ApiResponse<CashBankOverview>>(url)

      return response.data.data
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}

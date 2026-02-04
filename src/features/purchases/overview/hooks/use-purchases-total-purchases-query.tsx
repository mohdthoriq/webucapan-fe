import { useQuery } from '@tanstack/react-query'
import type { ApiResponse } from '@/types'
import apiClient from '@/lib/api-client'
import type { TotalPurchases } from '../types/purchases-overview'

interface TotalPurchasesQueryParams {
  date_from: string
  date_to: string
  period: 'day' | 'week' | 'month' | 'year'
}

export function useTotalPurchasesQuery(params?: TotalPurchasesQueryParams) {
  return useQuery({
    queryKey: [
      'purchases-total-purchases',
      params?.date_from,
      params?.date_to,
      params?.period,
    ],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        ...(params?.date_from ? { date_from: params.date_from } : {}),
        ...(params?.date_to ? { date_to: params.date_to } : {}),
        ...(params?.period ? { period: params.period } : {}),
      })

      const url = queryParams.toString()
        ? `/purchase-overview/total-purchases?${queryParams.toString()}`
        : '/purchase-overview/total-purchases'
      const response = await apiClient.get<ApiResponse<TotalPurchases>>(url)

      return response.data.data
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}

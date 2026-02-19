import { useQuery } from '@tanstack/react-query'
import type { ApiResponse } from '@/types'
import apiClient from '@/lib/api-client'
import type { TotalSales } from '../types/sales-overview'
import { QUERY_KEY } from '@/constants/query-key'

interface TotalSalesQueryParams {
  date_from: string
  date_to: string
  period: 'day' | 'week' | 'month' | 'year'
}

export function useTotalSalesQuery(params?: TotalSalesQueryParams) {
  return useQuery({
    queryKey: [
      QUERY_KEY.SALES,
      QUERY_KEY.SALES_OVERVIEW,
      QUERY_KEY.SALES_TOTAL,
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
        ? `/sales-overview/total-sales?${queryParams.toString()}`
        : '/sales-overview/total-sales'
      const response = await apiClient.get<ApiResponse<TotalSales>>(url)

      return response.data.data
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}

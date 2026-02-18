import { useQuery } from '@tanstack/react-query'
import type { ApiResponse } from '@/types'
import apiClient from '@/lib/api-client'
import { QUERY_KEY } from '@/constants/query-key'
import type { TopCustomer } from '../types/sales-overview'

interface TopCustomerQueryParams {
  date_from: string
  date_to: string
  period: 'day' | 'week' | 'month' | 'year'
}

export function useTopCustomerQuery(params?: TopCustomerQueryParams) {
  return useQuery({
    queryKey: [
      QUERY_KEY.SALES,
      QUERY_KEY.SALES_OVERVIEW,
      QUERY_KEY.SALES_TOP_CUSTOMERS,
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
        ? `/sales-overview/top-customers?${queryParams.toString()}`
        : '/sales-overview/top-customers'
      const response = await apiClient.get<ApiResponse<TopCustomer>>(url)

      return response.data.data
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}

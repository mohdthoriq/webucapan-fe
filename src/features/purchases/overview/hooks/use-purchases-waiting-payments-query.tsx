import { useQuery } from '@tanstack/react-query'
import type { ApiResponse } from '@/types'
import apiClient from '@/lib/api-client'
import { QUERY_KEY } from '@/constants/query-key'
import type { WaitingPayments } from '../types/purchases-overview'

interface WaitingPaymentsQueryParams {
  date_from: string
  date_to: string
  period: 'day' | 'week' | 'month' | 'year'
}

export function useWaitingPaymentsQuery(params?: WaitingPaymentsQueryParams) {
  return useQuery({
    queryKey: [
      QUERY_KEY.PURCHASES,
      QUERY_KEY.PURCHASES_OVERVIEW,
      QUERY_KEY.PURCHASES_WAITING_PAYMENTS,
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
        ? `/purchase-overview/waiting-payment?${queryParams.toString()}`
        : '/purchase-overview/waiting-payment'
      const response = await apiClient.get<ApiResponse<WaitingPayments>>(url)

      return response.data.data
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}

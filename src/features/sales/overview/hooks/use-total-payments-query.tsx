import { useQuery } from '@tanstack/react-query'
import type { ApiResponse } from '@/types'
import apiClient from '@/lib/api-client'
import type { PaymentReceived, Period } from '../types/sales-overview'

interface TotalPaymentsQueryParams {
  date_from: string
  date_to: string
  period: Period
}

export function useTotalPaymentsQuery(params?: TotalPaymentsQueryParams) {
  return useQuery({
    queryKey: [
      'total-payments',
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
        ? `/sales-overview/payment-received?${queryParams.toString()}`
        : '/sales-overview/payment-received'
      const response = await apiClient.get<ApiResponse<PaymentReceived>>(url)

      return response.data.data
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}

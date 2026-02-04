import { useQuery } from '@tanstack/react-query'
import type { ApiResponse } from '@/types'
import apiClient from '@/lib/api-client'
import type { Overdue } from '../types/sales-overview'

interface OverdueQueryParams {
  date_from: string
  date_to: string
  period: 'day' | 'week' | 'month' | 'year'
}

export function useOverdueQuery(params?: OverdueQueryParams) {
  return useQuery({
    queryKey: ['sales-overdue', params?.date_from, params?.date_to, params?.period],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        ...(params?.date_from ? { date_from: params.date_from } : {}),
        ...(params?.date_to ? { date_to: params.date_to } : {}),
        ...(params?.period ? { period: params.period } : {}),
      })

      const url = queryParams.toString()
        ? `/sales-overview/overdue?${queryParams.toString()}`
        : '/sales-overview/overdue'
      const response = await apiClient.get<ApiResponse<Overdue>>(url)

      return response.data.data
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}

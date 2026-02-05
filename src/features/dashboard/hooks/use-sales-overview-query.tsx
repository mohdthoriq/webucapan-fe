import { useQuery } from '@tanstack/react-query'
import type { ApiResponse, DashboardData } from '@/types'
import apiClient from '@/lib/api-client'
import type { Period } from '@/features/sales/overview/types/sales-overview'

interface SalesOverviewQueryParams {
  date_from: string
  date_to: string
  period: Period
}

export function useSalesOverviewQuery(params?: SalesOverviewQueryParams) {
  return useQuery({
    queryKey: [
      'sales-overview',
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
        ? `/dashboard/sales?${queryParams.toString()}`
        : '/dashboard/sales'
      const response = await apiClient.get<ApiResponse<DashboardData>>(url)

      return response.data.data
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}

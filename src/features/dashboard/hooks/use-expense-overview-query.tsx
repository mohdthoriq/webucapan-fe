import { useQuery } from '@tanstack/react-query'
import type { ApiResponse, DashboardData } from '@/types'
import apiClient from '@/lib/api-client'
import { QUERY_KEY } from '@/constants/query-key'
import type { Period } from '@/features/sales/overview/types/sales-overview'

interface ExpenseOverviewQueryParams {
  date_from: string
  date_to: string
  period: Period
}

export function useExpenseOverviewQuery(params?: ExpenseOverviewQueryParams) {
  return useQuery({
    queryKey: [
      QUERY_KEY.EXPENSES,
      QUERY_KEY.DASHBOARD_EXPENSE,
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
        ? `/dashboard/expense?${queryParams.toString()}`
        : '/dashboard/expense'
      const response = await apiClient.get<ApiResponse<DashboardData>>(url)

      return response.data.data
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}

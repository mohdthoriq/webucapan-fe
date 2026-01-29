import { useQuery } from '@tanstack/react-query'
import type {
  ApiResponse,
  CashBankOverview,
  CashBankTransaction,
} from '@/types'
import apiClient from '@/lib/api-client'

export function useCashBankOverviewQuery() {
  return useQuery({
    queryKey: ['cash-bank-overview'],
    queryFn: async () => {
      const url = `/cash-bank`
      const response = await apiClient.get<ApiResponse<CashBankOverview>>(url)

      return response.data.data
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}

export interface CashBankListQueryParams {
  page?: number
  limit?: number
  order?: string
  date_from?: Date
  date_to?: Date
  search?: string
  id?: string
}

export function useCashBankListQuery(params?: CashBankListQueryParams) {
  return useQuery({
    queryKey: [
      'cash-bank-list',
      params?.page,
      params?.limit,
      params?.order,
      params?.search,
      params?.date_from,
      params?.date_to,
      params?.id,
    ],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        ...(params?.page ? { page: params.page.toString() } : {}),
        ...(params?.limit ? { limit: params.limit.toString() } : {}),
        ...(params?.search ? { search: params.search } : {}),
        ...(params?.date_from
          ? { date_from: params.date_from.toISOString() }
          : {}),
        ...(params?.date_to ? { date_to: params.date_to.toISOString() } : {}),

        ...(params?.order ? { order: params.order } : {}),
        ...(params?.id ? { id: params.id } : {}),
      })

      const url = queryParams.toString()
        ? `/cash-bank/${params?.id}/transactions?${queryParams.toString()}`
        : `/cash-bank/${params?.id}/transactions`
      const response =
        await apiClient.get<ApiResponse<CashBankTransaction>>(url)

      return response.data.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // optional: retry once only
    enabled: !!params?.id,
  })
}

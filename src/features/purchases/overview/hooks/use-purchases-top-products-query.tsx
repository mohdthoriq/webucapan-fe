import { useQuery } from '@tanstack/react-query'
import type { ApiResponse } from '@/types'
import apiClient from '@/lib/api-client'
import type { TopPurchasedProducts } from '../types/purchases-overview'
import { QUERY_KEY } from '@/constants/query-key'

interface TopProductsQueryParams {
  date_from: string
  date_to: string
  period: 'day' | 'week' | 'month' | 'year'
}

export function useTopProductsQuery(params?: TopProductsQueryParams) {
  return useQuery({
    queryKey: [
      QUERY_KEY.PURCHASES,
      QUERY_KEY.PURCHASES_OVERVIEW,
      QUERY_KEY.PURCHASES_TOP_PRODUCTS,
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
        ? `/purchase-overview/top-products?${queryParams.toString()}`
        : '/purchase-overview/top-products'
      const response =
        await apiClient.get<ApiResponse<TopPurchasedProducts>>(url)

      return response.data.data
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}

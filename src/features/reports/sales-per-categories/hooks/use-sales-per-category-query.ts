import { useQuery } from '@tanstack/react-query'
import type { ApiResponse } from '@/types/api/response'
import type { CategorySalesReportResponse } from '@/types/domain/sales-per-categories'
import apiClient from '@/lib/api-client'
import { QUERY_KEY } from '@/constants/query-key'

export interface SalesPerCategoryQueryParams {
  date_from?: string
  date_to?: string
  search?: string
  product_category_id?: string
  page?: number
  limit?: number
}

export function useSalesPerCategoryQuery(params: SalesPerCategoryQueryParams) {
  return useQuery({
    queryKey: [QUERY_KEY.REPORTS_SALES_CATEGORY, params],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<CategorySalesReportResponse>>(
        '/reports/sales/per-category',
        {
          params,
        }
      )
      // return response.data.data.data
      return response.data.data?.data
    }, 
    enabled: !!(params.date_from && params.date_to),
  })
}

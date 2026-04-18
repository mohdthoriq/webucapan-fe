import { useQuery } from '@tanstack/react-query'
import type { ApiResponse } from '@/types/api/response'
import type { ProductSalesReportResponse } from '@/types/domain/sales-per-products'
import apiClient from '@/lib/api-client'
import { QUERY_KEY } from '@/constants/query-key'

export interface SalesPerProductQueryParams {
  date_from?: string
  date_to?: string
  search?: string
  product_category_id?: string
  page?: number
  limit?: number
}

export function useSalesPerProductQuery(params: SalesPerProductQueryParams) {
  return useQuery({
    queryKey: [QUERY_KEY.REPORTS_SALES_PRODUCT, params],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<ProductSalesReportResponse>>(
        '/reports/sales/per-product',
        {
          params,
        }
      )
      // Based on provided JSON: response.data.data.data is where items/pagination/summary are
      return response.data.data?.data
    },
    enabled: !!(params.date_from && params.date_to),
  })
}

import { useQuery } from '@tanstack/react-query'
import type { PaginationApiResponse, SalesDelivery } from '@/types'
import apiClient from '@/lib/api-client'
import { QUERY_KEY } from '@/constants/query-key'

export interface DeliveryListQueryParams {
  page?: number
  limit?: number
  order?: string
  company_id?: string
  customer_id?: string
  payment_status?: 'unpaid' | 'partially_paid' | 'paid'
  invoice_number?: string
  shipping_date_from?: Date
  shipping_date_to?: Date
  expedition_id?: string
}

export function useDeliveryListQuery(params?: DeliveryListQueryParams) {
  return useQuery({
    queryKey: [QUERY_KEY.SALES, QUERY_KEY.SALES_DELIVERY, params],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        ...(params?.page ? { page: params.page.toString() } : {}),
        ...(params?.limit ? { limit: params.limit.toString() } : {}),
        ...(params?.invoice_number
          ? { invoice_number: params.invoice_number }
          : {}),
        ...(params?.shipping_date_from
          ? { shipping_date_from: params.shipping_date_from.toISOString() }
          : {}),
        ...(params?.shipping_date_to
          ? { shipping_date_to: params.shipping_date_to.toISOString() }
          : {}),
        ...(params?.payment_status
          ? { payment_status: params.payment_status }
          : {}),
        ...(params?.customer_id ? { customer_id: params.customer_id } : {}),
        ...(params?.company_id ? { company_id: params.company_id } : {}),
        ...(params?.order ? { order: params.order } : {}),
        ...(params?.expedition_id
          ? { expedition_id: params.expedition_id }
          : {}),
      })

      const url = queryParams.toString()
        ? `/sales-delivery?${queryParams.toString()}`
        : '/sales-delivery'
      const response =
        await apiClient.get<PaginationApiResponse<SalesDelivery>>(url)

      return response.data
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}

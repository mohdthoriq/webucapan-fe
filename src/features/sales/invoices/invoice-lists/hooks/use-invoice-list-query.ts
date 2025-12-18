import { useQuery } from '@tanstack/react-query'
import type { PaginationApiResponse, SalesInvoice } from '@/types'
import apiClient from '@/lib/api-client'

interface RoleSettingsQueryParams {
  page?: number
  limit?: number
  order?: string
  company_id?: string
  customer_id?: string
  status?: 'draft' | 'issued' | 'paid' | 'cancelled'
  invoice_number?: string
  date_from?: Date
  date_to?: Date
}

export function useInvoiceListQuery(params?: RoleSettingsQueryParams) {

  return useQuery({
    queryKey: [
      'invoice-list',
      params?.page,
      params?.limit,
      params?.order,
      params?.invoice_number,
      params?.date_from,
      params?.date_to,
      params?.status,
      params?.customer_id,
      params?.company_id,
    ],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        ...(params?.page ? { page: params.page.toString() } : {}),
        ...(params?.limit ? { limit: params.limit.toString() } : {}),
        ...(params?.invoice_number ? { invoice_number: params.invoice_number } : {}),
        ...(params?.date_from ? { date_from: params.date_from.toString() } : {}),
        ...(params?.date_to ? { date_to: params.date_to.toString() } : {}),
        ...(params?.status ? { status: params.status } : {}),
        ...(params?.customer_id ? { customer_id: params.customer_id } : {}),
        ...(params?.company_id ? { company_id: params.company_id } : {}),
        ...(params?.order ? { order: params.order } : {}),
      })

      const url = queryParams.toString()
        ? `/sales-invoices?${queryParams.toString()}`
        : '/sales-invoices'
      const response = await apiClient.get<PaginationApiResponse<SalesInvoice>>(url)

      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // optional: retry once only
  })
}

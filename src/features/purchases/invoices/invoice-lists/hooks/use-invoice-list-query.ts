import { useQuery } from '@tanstack/react-query'
import type { PaginationApiResponse, PurchaseInvoice } from '@/types'
import apiClient from '@/lib/api-client'

interface InvoiceListQueryParams {
  page?: number
  limit?: number
  order?: string
  vendor_id?: string
  status?: 'unpaid' | 'partially_paid' | 'paid'
  invoice_number?: string
  date_from?: Date
  date_to?: Date
}

export function useInvoiceListQuery(params?: InvoiceListQueryParams) {

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
      params?.vendor_id,
    ],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        ...(params?.page ? { page: params.page.toString() } : {}),
        ...(params?.limit ? { limit: params.limit.toString() } : {}),
        ...(params?.invoice_number ? { invoice_number: params.invoice_number } : {}),
        ...(params?.date_from ? { date_from: params.date_from.toString() } : {}),
        ...(params?.date_to ? { date_to: params.date_to.toString() } : {}),
        ...(params?.status ? { status: params.status } : {}),
        ...(params?.vendor_id ? { vendor_id: params.vendor_id } : {}),
        ...(params?.order ? { order: params.order } : {}),
      })

      const url = queryParams.toString()
        ? `/purchase-invoices?${queryParams.toString()}`
        : '/purchase-invoices'
      const response = await apiClient.get<PaginationApiResponse<PurchaseInvoice>>(url)

      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // optional: retry once only
  })
}

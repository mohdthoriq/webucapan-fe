import { useQuery } from '@tanstack/react-query'
import type { SalesInvoice, ApiResponse } from '@/types'
import apiClient from '@/lib/api-client'

interface InvoiceFormQueryParams {
  id?: string
}

export function useInvoiceFormQuery(params?: InvoiceFormQueryParams) {
  return useQuery({
    queryKey: ['invoice-list', params?.id],
    queryFn: async () => {
      const url = `/sales-invoices/${params?.id}`
      const response = await apiClient.get<ApiResponse<SalesInvoice>>(url)

      return response.data.data
    },
    enabled: !!params?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // optional: retry once only
  })
}

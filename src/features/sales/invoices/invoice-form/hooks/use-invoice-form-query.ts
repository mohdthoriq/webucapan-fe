import { useQuery } from '@tanstack/react-query'
import type { PaginationApiResponse, SalesInvoice } from '@/types'
import apiClient from '@/lib/api-client'

interface InvoiceFormQueryParams {
  id?: string
}

export function useInvoiceFormQuery(params?: InvoiceFormQueryParams) {

  return useQuery({
    queryKey: [
      'invoice-form',
      params?.id,
    ],
    queryFn: async () => {
      const url = `/invoices/${params?.id}`
      const response = await apiClient.get<PaginationApiResponse<SalesInvoice>>(url)

      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // optional: retry once only
  })
}

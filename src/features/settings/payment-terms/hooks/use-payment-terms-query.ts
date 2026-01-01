import { useQuery } from '@tanstack/react-query'
import type { PaymentTerm, PaginationApiResponse } from '@/types'
import apiClient from '@/lib/api-client'

interface PaymentTermsQueryParams {
  page?: number
  limit?: number
  name?: string
  company_id?: string
}

export function usePaymentTermsQuery(params?: PaymentTermsQueryParams) {

  return useQuery({
    queryKey: [
      'payment-terms',
      params?.page,
      params?.limit,
      params?.name,
      params?.company_id
    ],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        ...(params?.page ? { page: params.page.toString() } : {}),
        ...(params?.limit ? { limit: params.limit.toString() } : {}),
        ...(params?.name ? { name: params.name } : {}),
        ...(params?.company_id ? { company_id: params.company_id } : {}),

      })

      const url = queryParams.toString()
        ? `/payment-terms?${queryParams.toString()}`
        : '/payment-terms'
      const response =
        await apiClient.get<PaginationApiResponse<PaymentTerm>>(url)

      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // optional: retry once only
  })
}

import { useQuery } from '@tanstack/react-query'
import type {
  SalesInvoice,
  ApiResponse,
  FinanceNumberType,
  FinanceNumber,
} from '@/types'
import apiClient from '@/lib/api-client'

interface InvoiceFormQueryParams {
  id?: string
}

export function useInvoiceFormQuery(params?: InvoiceFormQueryParams) {
  return useQuery({
    queryKey: ['sales-invoice-list', params?.id],
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

interface AutoNumberingQueryParams {
  type: FinanceNumberType
}

export function useDefaultNumberingQuery(params: AutoNumberingQueryParams) {
  return useQuery({
    queryKey: ['auto-numbering', params.type],
    queryFn: async () => {
      const url = `/auto-numbering/type/${params.type}`
      const response = await apiClient.get<ApiResponse<FinanceNumber>>(url)

      return response.data.data
    },
    staleTime: 1 * 30 * 1000, // 30 seconds
    retry: 1, // optional: retry once only
  })
}

interface CheckFinanceNumberParams {
  type: FinanceNumberType
  number: string
}

export interface CheckFinanceNumberResponse {
  exists: boolean
  available: boolean
  message: string
}

export function useCheckFinanceNumberQuery(params: CheckFinanceNumberParams) {
  return useQuery({
    queryKey: ['check-finance-number', params.type, params.number],
    queryFn: async () => {
      const response = await apiClient.get<
        ApiResponse<CheckFinanceNumberResponse>
      >('/auto-numbering/check', {
        params: {
          type: params.type,
          number: params.number,
        },
      })
      return response.data.data
    },
    enabled: !!params.number && params.number.length > 3,
  })
}

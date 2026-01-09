import { useQuery } from '@tanstack/react-query'
import type { Expense, PaginationApiResponse } from '@/types'
import apiClient from '@/lib/api-client'

interface InvoiceListQueryParams {
  page?: number
  limit?: number
  order?: string
  company_id?: string
  contact_id?: string
  status?: 'unpaid' | 'partially_paid' | 'paid'
  expense_number?: string
  date_from?: Date
  date_to?: Date
}

export function useExpensesListQuery(params?: InvoiceListQueryParams) {
  return useQuery({
    queryKey: [
      'expenses-list',
      params?.page,
      params?.limit,
      params?.order,
      params?.expense_number,
      params?.date_from,
      params?.date_to,
      params?.status,
      params?.contact_id,
      params?.company_id,
    ],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        ...(params?.page ? { page: params.page.toString() } : {}),
        ...(params?.limit ? { limit: params.limit.toString() } : {}),
        ...(params?.expense_number
          ? { expense_number: params.expense_number }
          : {}),
        ...(params?.date_from
          ? { date_from: params.date_from.toString() }
          : {}),
        ...(params?.date_to ? { date_to: params.date_to.toString() } : {}),
        ...(params?.status ? { status: params.status } : {}),
        ...(params?.contact_id ? { contact_id: params.contact_id } : {}),
        ...(params?.company_id ? { company_id: params.company_id } : {}),
        ...(params?.order ? { order: params.order } : {}),
      })

      const url = queryParams.toString()
        ? `/expenses?${queryParams.toString()}`
        : '/expenses'
      const response = await apiClient.get<PaginationApiResponse<Expense>>(url)

      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // optional: retry once only
  })
}

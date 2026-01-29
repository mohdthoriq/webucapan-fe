import { useQuery } from '@tanstack/react-query'
import type { ApiResponse } from '@/types'
import apiClient from '@/lib/api-client'
import type { CashBankTransactionDetail } from '../types/cash-bank-detail.types'

interface CashBankDetailQueryParams {
  accountId?: string
  transactionId?: string
}

export function useCashBankDetailQuery(params?: CashBankDetailQueryParams) {
  return useQuery({
    queryKey: [
      'cash-bank-transaction',
      params?.accountId,
      params?.transactionId,
    ],
    queryFn: async () => {
      const url = `/cash-bank/${params?.accountId}/transactions/${params?.transactionId}`
      const response =
        await apiClient.get<ApiResponse<CashBankTransactionDetail>>(url)

      return response.data.data
    },
    // enabled: !!params?.accountId && !!params?.transactionId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // optional: retry once only
  })
}

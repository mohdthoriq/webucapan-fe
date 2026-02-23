import { useQuery } from '@tanstack/react-query'
import type { TransactionType } from '@/types'
import apiClient from '@/lib/api-client'
import { QUERY_KEY_ADMIN } from '@/constants/query-key'

export const useTransactionTypesQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY_ADMIN.TRANSACTION_TYPES],
    queryFn: async () => {
      // Mengambil data dari API
      const response = await apiClient.get<{ data: TransactionType[] }>(
        '/transaction-types'
      )
      // Mengembalikan array data
      return response.data.data
    },
  })
}

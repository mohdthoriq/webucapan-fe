import { useQuery } from '@tanstack/react-query'
import apiClient from '@/lib/api-client'
import type { TransactionType } from '@/types'

export const useTransactionTypesQuery = () => {
  return useQuery({
    queryKey: ['transaction-types'],
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

import { useQuery } from '@tanstack/react-query'
import type { ApiResponse, AutoNumberingResponse } from '@/types'
import apiClient from '@/lib/api-client'

interface AutoNumberingApiResult {
  success: boolean
  data: AutoNumberingResponse
  message: string
}

export function useAutoNumberingQuery() {
  return useQuery({
    queryKey: ['auto-numbering'],
    queryFn: async () => {
      const url = '/auto-numbering'
      const response =
        await apiClient.get<ApiResponse<AutoNumberingApiResult>>(url)

      if (!response.data || !response.data.data) {
        throw new Error('Invalid API response structure')
      }

      return response.data.data
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}

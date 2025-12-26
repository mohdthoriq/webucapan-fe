import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ApiResponse, FinanceNumber } from '@/types'
import apiClient from '@/lib/api-client'

export function useUpdateAutoNumberingMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Partial<FinanceNumber> & { id: string }) => {
      const { id, ...payload } = data
      const response = await apiClient.patch(`/auto-numbering/${id}`, payload)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auto-numbering'] })
    },
  })
}

export function useAutoNumberingPreview() {
  return useMutation({
    mutationFn: async (data: { format_only: string; sequence: number }) => {
      const response = await apiClient.post<ApiResponse<{ format: string }>>(
        `/auto-numbering/preview`,
        data
      )
      return response.data.data?.format || ''
    },
  })
}

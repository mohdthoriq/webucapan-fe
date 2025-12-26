import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient from '@/lib/api-client'
import type { FinanceNumber } from '@/types'

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

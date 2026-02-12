import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import type { ApiResponse } from '@/types'
import type { AxiosError } from 'axios'

export function usePlanPermissionsQuery(planId: string) {
  return useQuery({
    queryKey: ['plan-permissions', planId],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<string[]>>(
        `/subscriptions/plans/${planId}/permissions`
      )
      return response.data.data ?? []
    },
    enabled: !!planId,
  })
}

export function useUpdatePlanPermissionsMutation(planId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (permissionIds: string[]) => {
      const response = await apiClient.patch(
        `/subscriptions/plans/${planId}/permissions`,
        { permissions: permissionIds }
      )
      return response.data
    },
    onMutate: () => {
      toast.loading('Updating permissions...', { id: 'plan-permissions-toast' })
    },
    onSuccess: () => {
      toast.dismiss('plan-permissions-toast')
      queryClient.invalidateQueries({ queryKey: ['plan-permissions', planId] })
      toast.success('Permissions updated successfully.')
    },
    onError: (error: AxiosError<ApiResponse>) => {
      toast.dismiss('plan-permissions-toast')
      toast.error(
        error.response?.data?.message || 'Failed to update permissions.'
      )
    },
  })
}

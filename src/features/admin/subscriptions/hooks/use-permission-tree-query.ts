import { useQuery } from '@tanstack/react-query'
import apiClient from '@/lib/api-client'
import type { Permission, ApiResponse } from '@/types'

export interface PermissionTreeItem extends Permission {
  children: PermissionTreeItem[]
}

export function usePermissionTreeQuery() {
  return useQuery({
    queryKey: ['permissions-tree'],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<PermissionTreeItem[]>>(
        '/permissions/tree'
      )
      return response.data.data
    },
    staleTime: 5 * 60 * 1000,
  })
}

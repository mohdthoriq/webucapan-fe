import type { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ApiResponse, CompanyRole, Permission } from '@/types';
import { toast } from 'sonner';
import apiClient from '@/lib/api-client'

export interface RolePermission {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  role_id: string
  permission_id: string
  permission: Permission
}

export interface RoleWithPermissions extends CompanyRole {
  role_permissions: RolePermission[]
}


export function useCompanyRolePermissionsQuery(roleId: string | undefined) {
  return useQuery({
    queryKey: ['company-role-permissions', roleId],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<RoleWithPermissions>>(
        `/roles/${roleId}`
      )
      return response.data.data
    },
    enabled: !!roleId,
  })
}

export function useUpdateCompanyRolePermissionsMutation(roleId: string | undefined) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (permissionIds: string[]) => {
      const response = await apiClient.put(`/roles/${roleId}/permissions`, {
        permission_ids: permissionIds,
      })
      return response.data
    },
    onMutate: () => {
      toast.loading('Updating permissions...', { id: 'role-permissions-toast' })
    },
    onSuccess: () => {
      toast.dismiss('role-permissions-toast')
      queryClient.invalidateQueries({
        queryKey: ['company-role-permissions', roleId],
      })
      toast.success('Permissions updated successfully.')
    },
    onError: (error: AxiosError<ApiResponse>) => {
      toast.dismiss('role-permissions-toast')
      toast.error(
        error.response?.data?.message || 'Failed to update permissions.'
      )
    },
  })
}
import { useQuery } from '@tanstack/react-query';
import type { ApiResponse, CompanyRole, Permission } from '@/types';
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
  role_permissions?: RolePermission[]
  permissions?: Permission[]
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
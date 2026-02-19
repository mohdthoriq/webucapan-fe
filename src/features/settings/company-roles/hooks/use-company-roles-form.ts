import { useForm, type UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ApiResponse, CompanyRole } from '@/types'
import { useAuthStore } from '@/stores/auth-store'
import {
  createCompanyRoleSettingsSchema,
  type CreateCompanyRoleSettingsFormData,
  type UpdateCompanyRoleSettingsFormData,
} from '../types/company-roles.schema'
import {
  useCreateCompanyRoleMutation,
  useUpdateCompanyRoleMutation,
} from './use-company-roles-mutation'
import type { AxiosError } from 'axios'

type useCompanySettingsFormProps = {
  currentRow?: CompanyRole
}

export function useCompanySettingsForm({
  currentRow,
}: useCompanySettingsFormProps): {
  form: UseFormReturn<CreateCompanyRoleSettingsFormData>
  onSubmit: (data: CreateCompanyRoleSettingsFormData) => Promise<ApiResponse<CompanyRole> | void>
  isSubmitting: boolean
  errorMessage: string | null
} {
  const company = useAuthStore((state) => state.auth.user?.company)

  const isEdit = !!currentRow
  const form = useForm<CreateCompanyRoleSettingsFormData>({
    resolver: zodResolver(createCompanyRoleSettingsSchema),
    defaultValues: isEdit
      ? {
          name: currentRow?.name ?? '',
          description: currentRow?.description ?? '',
          company_id: currentRow?.company_id ?? company?.id ?? '',
          system_role: currentRow?.system_role ?? false,
          is_default: currentRow?.is_default ?? false,
          is_pos: currentRow?.is_pos ?? false,
          position: currentRow?.position ?? 0,
          permission_ids: (currentRow as unknown as { role_permissions?: Array<{permission_id: string}> })?.role_permissions?.map((p) => p.permission_id) ?? [],
        }
      : {
          company_id: company?.id ?? '',
          name: '',
          description: '',
          system_role: false,
          is_default: false,
          is_pos: false,
          position: 0,
          permission_ids: [],
        },
  })

  const createMutation = useCreateCompanyRoleMutation()
  const updateMutation = useUpdateCompanyRoleMutation()

  const errors = form.formState.errors
  const firstError = Object.values(errors)[0]
  const mutationError = createMutation.error || updateMutation.error
  const errorMessage =
    (mutationError
      ? (mutationError as AxiosError<ApiResponse>)?.response?.data?.message ||
        'Terjadi kesalahan saat menyimpan data'
      : null) ||
    (firstError ? firstError.message || 'Terjadi kesalahan pada input' : null)

  const onSubmit = async (data: CreateCompanyRoleSettingsFormData) => {
    if (isEdit && currentRow) {
      const updateData: UpdateCompanyRoleSettingsFormData = {
        id: currentRow.id,
        ...data
      }
      return await updateMutation.mutateAsync(updateData)
    } else {
      return await createMutation.mutateAsync(data)
    }
  }

  return {
    form,
    onSubmit,
    isSubmitting: createMutation.isPending || updateMutation.isPending,
    errorMessage,
  } 
}

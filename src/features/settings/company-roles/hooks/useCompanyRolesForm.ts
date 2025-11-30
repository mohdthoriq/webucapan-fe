import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { CompanyRole } from '@/types';
import { useAuthStore } from '@/stores/auth-store';
import { createCompanyRoleSettingsSchema, type CreateCompanyRoleSettingsFormData, type UpdateCompanyRoleSettingsFormData } from '../types/company-roles.schema';
import { useCreateCompanyRoleMutation, useUpdateCompanyRoleMutation } from './useCompanyRolesMutation';


type useCompanySettingsFormProps = {
  currentRow?: CompanyRole
}

export function useCompanySettingsForm({
  currentRow,
}: useCompanySettingsFormProps) {
  const company = useAuthStore((state) => state.auth.user?.company)

  const isEdit = !!currentRow
  const form = useForm<CreateCompanyRoleSettingsFormData>({
    resolver: zodResolver(createCompanyRoleSettingsSchema),
    defaultValues: isEdit
      ? {
          name: currentRow?.name,
          description: currentRow?.description,
          company_id: currentRow?.company?.id ?? company?.id ?? '',
        }
      : {
          company_id: company?.id ?? '',
          name: '',
          description: '',
        },
  })

  const createMutation = useCreateCompanyRoleMutation()
  const updateMutation = useUpdateCompanyRoleMutation()

  const onSubmit = async (data: CreateCompanyRoleSettingsFormData) => {
    if (isEdit && currentRow) {
      const updateData: UpdateCompanyRoleSettingsFormData = {
        id: currentRow.id,
        name: data.name,
        description: data.description,
      }
      await updateMutation.mutateAsync(updateData)
      form.reset()
    } else {
      await createMutation.mutateAsync(data)
      
    }
  }

  return {
    form,
    onSubmit,
    isSubmitting: createMutation.isPending || updateMutation.isPending,
  }
}
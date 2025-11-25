import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import { type CompanyRole } from '../types/company-roles-response.type'
import {
  type CompanyRoleSettingsFormData,
  companyRoleSettingsSchema,
} from '../types/company-roles.schema'
import { useCreateCompanyRoleMutation } from './useCompanyRolesMutation'

type useCompanySettingsFormProps = {
  currentRow?: CompanyRole
}

export function useCompanySettingsForm({
  currentRow,
}: useCompanySettingsFormProps) {
  const company = useAuthStore((state) => state.auth.user?.company)

  const isEdit = !!currentRow
  const form = useForm<CompanyRoleSettingsFormData>({
    resolver: zodResolver(companyRoleSettingsSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
        }
      : {
          company_id: company?.id,
          name: '',
          description: '',
        },
  })

  const companySettingsMutation = useCreateCompanyRoleMutation()

  const onSubmit = async (data: CompanyRoleSettingsFormData) => {
    try {
      await companySettingsMutation.mutateAsync(data)

      toast.success('Peran berhasil ditambahkan')
    } catch (_) {
      toast.error('Gagal menambahkan peran')
    }
  }

  return {
    form,
    onSubmit,
    isSubmitting: companySettingsMutation.isPending,
  }
}

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Unit } from '@/types'
import { useAuthStore } from '@/stores/auth-store'
import {
  createUnitSchema,
  type CreateUnitFormData,
  type UpdateUnitFormData,
} from '@/features/settings/units/types/units.schema'
import {
  useCreateContactMutation,
  useUpdateContactMutation,
} from './use-contacts-mutation'

type useContactsFormProps = {
  currentRow?: Unit
}

export function useContactsForm({ currentRow }: useContactsFormProps) {
  const company = useAuthStore((state) => state.auth.user?.company)

  const isEdit = !!currentRow
  const form = useForm<CreateUnitFormData>({
    resolver: zodResolver(createUnitSchema),
    defaultValues: isEdit
      ? {
          name: currentRow?.name,
          code: currentRow?.code,
          company_id: currentRow?.company?.id ?? company?.id ?? '',
        }
      : {
          company_id: company?.id ?? '',
          name: '',
          code: '',
        },
  })

  const createMutation = useCreateContactMutation()
  const updateMutation = useUpdateContactMutation()

  const onSubmit = async (data: CreateUnitFormData) => {
    if (isEdit && currentRow) {
      const updateData: UpdateUnitFormData = {
        id: currentRow.id,
        name: data.name,
        code: data.code,
      }
      await updateMutation.mutateAsync(updateData)
      form.reset()
    } else {
      await createMutation.mutateAsync(data)
      form.reset()
    }
  }

  return {
    form,
    onSubmit,
    isSubmitting: createMutation.isPending || updateMutation.isPending,
  }
}

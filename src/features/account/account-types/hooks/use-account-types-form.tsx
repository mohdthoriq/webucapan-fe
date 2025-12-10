import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { AccountType } from '@/types'
import {
  type CreateAccountTypeFormData,
  type UpdateAccountTypeFormData,
  createAccountTypeSchema,
} from '../types/account-types.schema'
import {
  useCreateAccountTypeMutation,
  useUpdateAccountTypeMutation,
} from './use-account-types-mutation'

type useAccountTypesFormProps = {
  currentRow?: AccountType
}

export function useAccountTypesForm({ currentRow }: useAccountTypesFormProps) {

  const isEdit = !!currentRow
  const form = useForm<CreateAccountTypeFormData>({
    resolver: zodResolver(createAccountTypeSchema),
    defaultValues: isEdit
      ? {
          name: currentRow?.name,
          code: currentRow?.code,
          normal_balance: currentRow?.normal_balance,
        }
      : {
          name: '',
          code: '',
          normal_balance: '',
        },
  })

  const createMutation = useCreateAccountTypeMutation()
  const updateMutation = useUpdateAccountTypeMutation()

  const onSubmit = async (data: CreateAccountTypeFormData) => {
    if (isEdit && currentRow) {
      const updateData: UpdateAccountTypeFormData = {
        id: currentRow.id,
        name: data.name,
        code: data.code,
        normal_balance: data.normal_balance,
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

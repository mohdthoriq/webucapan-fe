import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Account } from '@/types'
import {
  useCreateAccountMutation,
  useUpdateAccountMutation,
} from './use-account-mutation'
import { type CreateAccountFormData, createAccountSchema, type UpdateAccountFormData } from '../types/account.schema'

type useAccountsFormProps = {
  currentRow?: Account
}

export function useAccountsForm({ currentRow }: useAccountsFormProps) {

  const isEdit = !!currentRow
  const form = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: isEdit
      ? {
          name: currentRow?.name,
          type_id: currentRow?.type?.id ?? '',
          code: currentRow?.code ?? '',
          category_id: currentRow?.category?.id ?? '',
          parent_id: currentRow?.parent?.id ?? null,
          allow_transaction: currentRow?.allow_transaction ?? false,
          is_active: currentRow?.is_active ?? true,
          description: currentRow?.description ?? '',
        }
      : {
          name: '',
          type_id: '',
          code: '',
          category_id: '',
          parent_id: null,
          allow_transaction: false,
          is_active: true,
          description: '',
        },
  })

  const createMutation = useCreateAccountMutation()
  const updateMutation = useUpdateAccountMutation()

  const onSubmit = async (data: CreateAccountFormData) => {
    if (isEdit && currentRow) {
      const updateData: UpdateAccountFormData = {
        id: currentRow.id,
        name: data.name,
        type_id: data.type_id,
        code: data.code,
        category_id: data.category_id,
        parent_id: data.parent_id,
        allow_transaction: data.allow_transaction,
        is_active: data.is_active,
        description: data.description,
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

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Account, ApiResponse } from '@/types'
import {
  type CreateAccountFormData,
  createAccountSchema,
  type UpdateAccountFormData,
} from '../types/account.schema'
import {
  useCreateAccountMutation,
  useUpdateAccountMutation,
} from './use-account-mutation'
import type { AxiosError } from 'axios'

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
          code: currentRow?.code ?? '',
          category_id: currentRow?.category?.id ?? '',
          parent_id: currentRow?.parent?.id ?? null,
          allow_transaction: currentRow?.allow_transaction ?? false,
          is_active: currentRow?.is_active ?? true,
          description: currentRow?.description ?? '',
        }
      : {
          name: '',
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

  const errors = form.formState.errors
  const firstError = Object.values(errors)[0]
  const mutationError = createMutation.error || updateMutation.error
  const errorMessage =
    (mutationError
      ? (mutationError as AxiosError<ApiResponse>)?.response?.data?.message ||
        'Terjadi kesalahan saat menyimpan data'
      : null) ||
    (firstError ? firstError.message || 'Terjadi kesalahan pada input' : null)

  const onSubmit = async (data: CreateAccountFormData) => {
    if (isEdit && currentRow) {
      const updateData: UpdateAccountFormData = {
        id: currentRow.id,
        name: data.name,
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
    errorMessage,
  }
}

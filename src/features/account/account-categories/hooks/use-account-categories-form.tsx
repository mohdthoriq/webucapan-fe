import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { AccountCategory } from '@/types'
import {
  type CreateAccountCategoryFormData,
  type UpdateAccountCategoryFormData,
  createAccountCategorySchema,
} from '../types/account-categories.schema'
import {
  useCreateAccountCategoryMutation,
  useUpdateAccountCategoryMutation,
} from './use-account-categories-mutation'

type useAccountCategoriesFormProps = {
  currentRow?: AccountCategory
}

export function useAccountCategoriesForm({ currentRow }: useAccountCategoriesFormProps) {

  const isEdit = !!currentRow
  const form = useForm<CreateAccountCategoryFormData>({
    resolver: zodResolver(createAccountCategorySchema),
    defaultValues: isEdit
      ? {
          name: currentRow?.name,
          description: currentRow?.description,
          type_id: currentRow?.type_id?.id ?? '',
        }
      : {
          name: '',
          type_id: '',
          description: '',
        },
  })

  const createMutation = useCreateAccountCategoryMutation()
  const updateMutation = useUpdateAccountCategoryMutation()

  const onSubmit = async (data: CreateAccountCategoryFormData) => {
    if (isEdit && currentRow) {
      const updateData: UpdateAccountCategoryFormData = {
        id: currentRow.id,
        name: data.name,
        type_id: data.type_id,
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

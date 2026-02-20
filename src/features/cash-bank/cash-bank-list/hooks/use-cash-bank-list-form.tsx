import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  type CreateCashBankListFormData,
  createCashBankListSchema,
  type UpdateCashBankListFormData,
} from '../types/cash-bank-list.schema'
import {
  useCreateCashBankListMutation,
  useUpdateCashBankListMutation,
} from './use-cash-bank-list-mutation'

export function useCashBankListForm(
  currentRow?: UpdateCashBankListFormData,
  onSuccess?: () => void
) {
  const isEdit = !!currentRow

  const form = useForm<CreateCashBankListFormData>({
    resolver: zodResolver(createCashBankListSchema),
    defaultValues: isEdit
      ? {
          from_account_id: currentRow?.from_account_id || '',
          to_account_id: currentRow?.to_account_id || '',
          tags: currentRow?.tags || null,
          amount: currentRow?.amount || 0,
          date: currentRow?.date ? new Date(currentRow.date) : new Date(),
          description: currentRow?.description || '',
        }
      : {
          from_account_id: '',
          to_account_id: '',
          tags: null,
          amount: 0,
          date: new Date(),
          description: '',
        },
  })

  const createMutation = useCreateCashBankListMutation()
  const updateMutation = useUpdateCashBankListMutation()

  const onSubmit = async (data: CreateCashBankListFormData) => {
    if (isEdit && currentRow) {
      const updateData: UpdateCashBankListFormData = {
        id: currentRow?.id,
        ...data,
      }
      await updateMutation.mutateAsync(updateData)
    } else {
      await createMutation.mutateAsync(data)
    }
    form.reset()
    onSuccess?.()
  }

  return {
    form,
    onSubmit,
    isSubmitting: createMutation.isPending,
  }
}

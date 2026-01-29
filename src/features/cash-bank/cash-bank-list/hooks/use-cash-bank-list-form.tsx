import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  type CreateCashBankListFormData,
  createCashBankListSchema,
} from '../types/cash-bank-list.schema'
import { useCreateCashBankListMutation } from './use-cash-bank-list-mutation'

export function useCashBankListForm() {
  const form = useForm<CreateCashBankListFormData>({
    resolver: zodResolver(createCashBankListSchema),
    defaultValues: {
      from_account_id: '',
      to_account_id: '',
      amount: 0,
      date: new Date(),
      description: '',
    },
  })

  const createMutation = useCreateCashBankListMutation()

  const onSubmit = async (data: CreateCashBankListFormData) => {
    await createMutation.mutateAsync(data)
    form.reset()
  }

  return {
    form,
    onSubmit,
    isSubmitting: createMutation.isPending,
  }
}

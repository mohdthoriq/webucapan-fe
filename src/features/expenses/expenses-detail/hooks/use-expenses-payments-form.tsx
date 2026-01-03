import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  type ExpensesPaymentsFormData,
  expensesPaymentsSchema,
} from '../types/expenses-payments.schema'
import { useCreateExpensesPaymentMutation } from './use-expenses-payments.mutation'

type UseExpensesPaymentsFormProps = {
  expenseId: string
  defaultAmount?: number
}

export function useExpensesPaymentsForm({
  expenseId,
  defaultAmount,
}: UseExpensesPaymentsFormProps) {
  const form = useForm<ExpensesPaymentsFormData>({
    resolver: zodResolver(
      expensesPaymentsSchema.refine(
        (data) => data.amount <= (defaultAmount || 0),
        {
          message: `Jumlah pembayaran tidak boleh melebihi sisa tagihan (${(
            defaultAmount || 0
          ).toLocaleString()})`,
          path: ['amount'],
        }
      )
    ),
    defaultValues: {
      payment_date: new Date(),
      amount: defaultAmount || 0,
      method: '',
      account_id: undefined,
      reference_no: '',
      note: '',
      tags: [],
    },
  })

  const createMutation = useCreateExpensesPaymentMutation(expenseId)

  useEffect(() => {
    if (defaultAmount !== undefined) {
      form.setValue('amount', defaultAmount)
    }
  }, [defaultAmount, form])

  const onSubmit = async (data: ExpensesPaymentsFormData) => {
    await createMutation.mutateAsync(data)
    const remaining = (defaultAmount || 0) - data.amount

    form.reset({
      payment_date: new Date(),
      amount: remaining > 0 ? remaining : 0,
      method: '',
      account_id: undefined,
      reference_no: '',
      note: '',
      tags: [],
    })
  }

  return {
    form,
    onSubmit,
    isSubmitting: createMutation.isPending,
  }
}

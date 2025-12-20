import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  type InvoicePaymentsFormData,
  invoicePaymentsSchema,
} from '../types/invoice-payments.schema'
import { useCreateInvoicePaymentMutation } from './use-invoice-payments.mutation'

type UseInvoicePaymentsFormProps = {
  invoiceId: string
  defaultAmount?: number
}

export function useInvoicePaymentsForm({
  invoiceId,
  defaultAmount,
}: UseInvoicePaymentsFormProps) {
  const form = useForm<InvoicePaymentsFormData>({
    resolver: zodResolver(
      invoicePaymentsSchema.refine(
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
      method: "",
      account_id: undefined,
      reference_no: '',
      note: '',
    },
  })

  const createMutation = useCreateInvoicePaymentMutation(invoiceId)

  useEffect(() => {
    if (defaultAmount !== undefined) {
      form.setValue('amount', defaultAmount)
    }
  }, [defaultAmount, form])

  const onSubmit = async (data: InvoicePaymentsFormData) => {
    await createMutation.mutateAsync(data)
    form.reset({
      payment_date: new Date(),
      amount: defaultAmount || 0,
      method: "",
      account_id: undefined,
      reference_no: '',
      note: '',
    })
  }

  return {
    form,
    onSubmit,
    isSubmitting: createMutation.isPending,
  }
}

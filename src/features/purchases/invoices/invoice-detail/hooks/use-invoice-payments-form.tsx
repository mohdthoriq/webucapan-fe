import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FinanceNumberType, type FinanceNumber } from '@/types'
import { useGenerateNextNumber } from '../../invoice-form/hooks/use-invoice-form-mutation'
import {
  type InvoicePaymentsFormData,
  invoicePaymentsSchema,
} from '../types/invoice-payments.schema'
import { useCreateInvoicePaymentMutation } from './use-invoice-payments.mutation'

type UseInvoicePaymentsFormProps = {
  invoiceId: string
  defaultAmount?: number
  defaultNumber?: FinanceNumber | null
}

export function useInvoicePaymentsForm({
  invoiceId,
  defaultAmount,
  defaultNumber,
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
      account_id: undefined,
      reference_no: defaultNumber?.format || '',
      note: '',
      tags: undefined,
      purchase_invoice_id: invoiceId,
    },
  })

  const createMutation = useCreateInvoicePaymentMutation(invoiceId)
  const generateNextNumber = useGenerateNextNumber()

  useEffect(() => {
    if (defaultAmount !== undefined) {
      form.setValue('amount', defaultAmount)
    }
    if (defaultNumber !== undefined) {
      form.setValue('reference_no', defaultNumber?.format || '')
    }
  }, [defaultAmount, defaultNumber, form])

  const onSubmit = async (data: InvoicePaymentsFormData) => {
    await createMutation.mutateAsync(data)
    form.reset({
      payment_date: new Date(),
      amount: defaultAmount || 0,
      account_id: undefined,
      reference_no: defaultNumber?.format || '',
      note: '',
      tags: undefined,
      purchase_invoice_id: invoiceId,
    })
    generateNextNumber.mutate(FinanceNumberType.purchase_payment)
  }

  return {
    form,
    onSubmit,
    isSubmitting: createMutation.isPending,
  }
}

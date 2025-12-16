import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Status, type SalesInvoice } from '@/types'
import {
  CreateInvoiceSchema,
  UpdateInvoiceSchema,
  type CreateInvoiceFormData,
  type UpdateInvoiceFormData,
} from '../types/invoice-form.schema'
import {
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
} from './use-invoice-form-mutation'

type UseInvoiceFormProps = {
  currentRow?: SalesInvoice
}

export function useInvoiceForm({ currentRow }: UseInvoiceFormProps) {
  const isEdit = !!currentRow

  const defaultValues =
    isEdit && currentRow
      ? {
          ...currentRow,
          id: currentRow.id,
          company_id: currentRow.company?.id ?? currentRow.company,
          customer_id: currentRow.customer?.id ?? currentRow.customer,
          payment_term_id:
            currentRow.payment_term?.id ?? currentRow.payment_term,

          invoice_date: currentRow.invoice_date
            ? new Date(currentRow.invoice_date)
            : new Date(),
          due_date: currentRow.due_date
            ? new Date(currentRow.due_date)
            : new Date(),

          invoice_items:
            currentRow.invoice_items?.map((item) => ({
              ...item,
              product_id: item.product?.id ?? item.product,
              tax_id: item.tax?.id ?? item.tax,
            })) || [],
        }
      : {
          invoice_number: '',
          company_id: '',
          customer_id: '',
          payment_term_id: '',
          currency: 'IDR',
          subtotal: 0,
          tax_total: 0,
          total: 0,
          status: Status.draft,
          invoice_date: new Date(),
          due_date: new Date(),
          invoice_items: [
            {
              product_id: '',
              description: '',
              quantity: 1,
              unit_price: 0,
              tax_id: '',
              discount: 0,
              total: 0,
            },
          ],
        }

  const form = useForm<CreateInvoiceFormData | UpdateInvoiceFormData>({
    resolver: zodResolver(isEdit ? UpdateInvoiceSchema : CreateInvoiceSchema),
    defaultValues: defaultValues,
  })

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: 'invoice_items',
  })

  const createMutation = useCreateInvoiceMutation()
  const updateMutation = useUpdateInvoiceMutation()

  const onSubmit = async (data: CreateInvoiceFormData | UpdateInvoiceFormData) => {
    if (isEdit && currentRow) {
      const updateData: UpdateInvoiceFormData = {
        id: currentRow.id,
        ...data,
        invoice_items: data.invoice_items.map((item) => ({
          id: item.id,
          ...item,
        })),
      }
      await updateMutation.mutateAsync(updateData)
      form.reset(data)
    } else {
      await createMutation.mutateAsync(data)
      form.reset()
    }
  }

  return {
    form,
    fields,
    append,
    remove,
    update,
    onSubmit,
    isSubmitting: createMutation.isPending || updateMutation.isPending,
    isEdit,
  }
}

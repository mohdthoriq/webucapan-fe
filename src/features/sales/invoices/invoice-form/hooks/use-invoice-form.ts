import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Status } from '@/types'
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
  currentRow?: UpdateInvoiceFormData
}

export function useInvoiceForm({ currentRow }: UseInvoiceFormProps) {
  const isEdit = !!currentRow

  const defaultValues =
    isEdit && currentRow
      ? {
          ...currentRow,
          id: currentRow.id,
          customer_id: currentRow.customer_id,
          payment_term_id: currentRow.payment_term_id,

          invoice_date: currentRow.invoice_date
            ? new Date(currentRow.invoice_date)
            : new Date(),
          due_date: currentRow.due_date
            ? new Date(currentRow.due_date)
            : new Date(),

          invoice_items:
            currentRow.invoice_items?.map((item) => ({
              ...item,
              product_id: item.product_id,
              tax_id: item.tax_id,
            })) || [],
          tags: currentRow.tags || null,
        }
      : {
          invoice_number: '',
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
          tags: [],
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

  const onSubmit = async (data: CreateInvoiceFormData) => {
    if (isEdit && currentRow) {
      const updateData: UpdateInvoiceFormData = {
        id: currentRow.id,
        ...data,
        invoice_items: data.invoice_items.map((item) => ({
          id: currentRow.invoice_items[0].id,
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

import { useEffect, useMemo } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type SalesInvoice, Status } from '@/types'
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

  const defaultValues = useMemo(
    () =>
      isEdit && currentRow
        ? {
            ...currentRow,
            id: currentRow.id,
            customer_id: currentRow.customer?.id ?? '',
            payment_term_id: currentRow.payment_term?.id ?? '',

            invoice_date: currentRow.invoice_date
              ? new Date(currentRow.invoice_date)
              : new Date(),
            due_date: currentRow.due_date
              ? new Date(currentRow.due_date)
              : new Date(),

            invoice_items:
              currentRow.invoice_items?.map((item) => ({
                ...item,
                product_id: item.product?.id ?? '',
                tax_id: item.tax?.id ?? '',
                unit_price: Number(item.unit_price),
                total: Number(item.line_total),
                quantity: Number(item.quantity),
              })) || [],
            tags: currentRow.tags || [],
          }
        : {
            invoice_number: '',
            customer_id: '',
            payment_term_id: '',
            currency: 'IDR',
            subtotal: 0,
            tax_total: 0,
            total: 0,
            status: Status.unpaid,
            invoice_date: new Date(),
            due_date: new Date(),
            invoice_items: [
              {
                product_id: '',
                description: '',
                quantity: 1,
                tax_id: '',
                total: 0,
              },
            ],
            tags: [],
          },
    [currentRow, isEdit]
  )

  const form = useForm<CreateInvoiceFormData | UpdateInvoiceFormData>({
    resolver: zodResolver(isEdit ? UpdateInvoiceSchema : CreateInvoiceSchema),
    defaultValues: defaultValues,
  })

  // Update form values when currentRow changes (e.g. after fetch)
  useEffect(() => {
    if (currentRow) {
      form.reset(defaultValues)
    }
  }, [currentRow, form, defaultValues])

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: 'invoice_items',
  })

  const createMutation = useCreateInvoiceMutation()
  const updateMutation = useUpdateInvoiceMutation()

  const onSubmit = async (data: CreateInvoiceFormData) => {
    if (isEdit && currentRow) {
      const updateData: UpdateInvoiceFormData = {
        ...data,
        id: currentRow.id,
      } as UpdateInvoiceFormData
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

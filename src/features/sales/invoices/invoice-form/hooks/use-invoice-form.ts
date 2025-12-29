import { useEffect, useMemo } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  type FinanceNumber,
  FinanceNumberType,
  type SalesInvoice,
  Status,
} from '@/types'
import {
  CreateInvoiceSchema,
  UpdateInvoiceSchema,
  type CreateInvoiceFormData,
  type UpdateInvoiceFormData,
} from '../types/invoice-form.schema'
import {
  useCreateInvoiceMutation,
  useGenerateNextNumber,
  useUpdateInvoiceMutation,
} from './use-invoice-form-mutation'
import { useNavigate } from '@tanstack/react-router'

type UseInvoiceFormProps = {
  currentRow?: SalesInvoice
  autoNumbering?: FinanceNumber | null
}

export function useInvoiceForm({
  currentRow,
  autoNumbering,
}: UseInvoiceFormProps) {
  const isEdit = !!currentRow
  const navigate = useNavigate()

  const defaultValues = useMemo(
    () =>
      isEdit && currentRow
        ? {
            id: currentRow.id,
            invoice_number: currentRow.invoice_number,
            customer_id: currentRow.customer?.id ?? '',
            payment_term_id: currentRow.payment_term?.id ?? undefined,
            status: currentRow.status,
            currency: currentRow.currency,
            subtotal: Number(currentRow.subtotal),
            tax_total: Number(currentRow.tax_total),
            total: Number(currentRow.total),
            invoice_date: currentRow.invoice_date
              ? new Date(currentRow.invoice_date)
              : new Date(),
            due_date: currentRow.due_date
              ? new Date(currentRow.due_date)
              : new Date(),
            invoice_items:
              currentRow.invoice_items?.map((item) => ({
                id: item.id,
                product_id: item.product?.id ?? undefined,
                description: item.description || undefined,
                quantity: Number(item.quantity) || 1,
                tax_id: item.tax?.id ?? undefined,
                unit_price: Number(item.unit_price) || 0,
                discount: Number(item.discount) || undefined,
                line_total: Number(item.line_total) || 0,
              })) || [],
            tags:
              currentRow.tags?.map((tag: string | { id: string }) =>
                typeof tag === 'object' ? tag.id : tag
              ) || [],
          }
        : {
            invoice_number: autoNumbering?.format ?? '',
            customer_id: '',
            payment_term_id: undefined,
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
                unit_price: 0,
                tax_id: '',
                discount: undefined,
                line_total: 0,
              },
            ],
            tags: [],
          },
    [currentRow, isEdit, autoNumbering]
  )

  const form = useForm<CreateInvoiceFormData | UpdateInvoiceFormData>({
    resolver: zodResolver(isEdit ? UpdateInvoiceSchema : CreateInvoiceSchema),
    defaultValues: defaultValues,
  })

  useEffect(() => {
    if (isEdit && currentRow) {
      form.reset(defaultValues)
    } else if (!isEdit && autoNumbering) {
      form.reset(defaultValues)
    }
  }, [currentRow, isEdit, autoNumbering, form, defaultValues])

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: 'invoice_items',
  })

  const createMutation = useCreateInvoiceMutation()
  const generateNextNumber = useGenerateNextNumber()
  const updateMutation = useUpdateInvoiceMutation()

  const onSubmit = async (data: CreateInvoiceFormData) => {
    if (isEdit && currentRow) {
      const updateData: UpdateInvoiceFormData = {
        ...data,
        id: currentRow.id,
      } as UpdateInvoiceFormData
      const response = await updateMutation.mutateAsync(updateData)
      form.reset(data)
      navigate({
        to: `/sales/invoices/detail`,
        state: { currentRowId: response.data.id } as Record<string, unknown>,
      })
    } else {
      const response = await createMutation.mutateAsync(data)
      await generateNextNumber.mutateAsync(FinanceNumberType.sales_invoice)
      form.reset()
      navigate({
        to: `/sales/invoices/detail`,
        state: { currentRowId: response.data.id } as Record<string, unknown>,
      })
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

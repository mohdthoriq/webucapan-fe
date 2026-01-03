import { useEffect, useMemo } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import {
  type FinanceNumber,
  FinanceNumberType,
  type Expense,
  Status,
} from '@/types'
import {
  CreateExpenseSchema,
  UpdateExpenseSchema,
  type CreateExpenseFormData,
  type UpdateExpenseFormData,
} from '../types/expenses-form.schema'
import {
  useCreateExpenseMutation,
  useGenerateNextNumber,
  useUpdateExpenseMutation,
} from './use-expenses-form-mutation'

type UseExpensesFormProps = {
  currentRow?: Expense
  autoNumbering?: FinanceNumber | null
}

export function useExpensesForm({
  currentRow,
  autoNumbering,
}: UseExpensesFormProps) {
  const isEdit = !!currentRow
  const navigate = useNavigate()

  const defaultValues = useMemo(
    () =>
      isEdit && currentRow
        ? {
            id: currentRow.id,
            expense_number: currentRow.expense_number,
            account_id: currentRow.account?.id ?? '',
            payment_term_id: currentRow.payment_term?.id ?? undefined,
            status: currentRow.status,
            currency: currentRow.currency,
            subtotal: Number(currentRow.subtotal),
            tax_total: Number(currentRow.tax_total),
            total: Number(currentRow.total),
            date: currentRow.date ? new Date(currentRow.date) : new Date(),
            due_date: currentRow.due_date
              ? new Date(currentRow.due_date)
              : new Date(),
            expense_items:
              currentRow.expense_items?.map((item) => ({
                id: item.id,
                account_id: item.account?.id ?? undefined,
                description: item.description || undefined,
                tax_id: item.tax?.id ?? undefined,
                amount: Number(item.amount) || 0,
              })) || [],
            tags:
              currentRow.tags?.map((tag: string | { id: string }) =>
                typeof tag === 'object' ? tag.id : tag
              ) || [],
          }
        : {
            expense_number: autoNumbering?.format ?? '',
            account_id: '',
            payment_term_id: undefined,
            currency: 'IDR',
            subtotal: 0,
            tax_total: 0,
            total: 0,
            status: Status.unpaid,
            date: new Date(),
            due_date: new Date(),
            expense_items: [
              {
                account_id: '',
                description: '',
                tax_id: '',
                amount: 0,
              },
            ],
            tags: [],
          },
    [currentRow, isEdit, autoNumbering]
  )

  const form = useForm<CreateExpenseFormData | UpdateExpenseFormData>({
    resolver: zodResolver(isEdit ? UpdateExpenseSchema : CreateExpenseSchema),
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
    name: 'expense_items',
  })

  const createMutation = useCreateExpenseMutation()
  const generateNextNumber = useGenerateNextNumber()
  const updateMutation = useUpdateExpenseMutation()

  const onSubmit = async (data: CreateExpenseFormData) => {
    if (isEdit && currentRow) {
      const updateData: UpdateExpenseFormData = {
        ...data,
        id: currentRow.id,
      } as UpdateExpenseFormData
      const response = await updateMutation.mutateAsync(updateData)
      form.reset(data)
      navigate({
        to: `/expenses/detail`,
        state: { currentRowId: response.data.id } as Record<string, unknown>,
      })
    } else {
      const response = await createMutation.mutateAsync(data)
      await generateNextNumber.mutateAsync(FinanceNumberType.expense)
      form.reset()
      navigate({
        to: `/expenses/detail`,
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

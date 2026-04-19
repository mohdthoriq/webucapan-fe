import { useEffect, useMemo } from 'react'
import type { AxiosError } from 'axios'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import {
  type FinanceNumber,
  FinanceNumberType,
  type Expense,
  type ApiResponse,
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
import { useUploadAttachmentsMutation } from '@/hooks/use-upload-attachments-mutation'
import { toast } from 'sonner'

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
            contact_id: currentRow.contact?.id ?? '',
            account_id: currentRow.account?.id ?? '',
            payment_term_id: currentRow.payment_term?.id ?? undefined,
            currency: currentRow.currency,
            subtotal: Number(currentRow.subtotal),
            tax_total: Number(currentRow.tax_total),
            total: Number(currentRow.total),
            is_paylater: currentRow.is_paylater ?? false,
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
            note: currentRow.note ?? '',
          }
        : {
            expense_number: autoNumbering?.format ?? '',
            contact_id: '',
            account_id: '',
            payment_term_id: undefined,
            currency: 'IDR',
            subtotal: 0,
            tax_total: 0,
            total: 0,
            is_paylater: false,
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
            note: '',
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
  const uploadAttachments = useUploadAttachmentsMutation()

  const errors = form.formState.errors
  const firstError = Object.values(errors)[0]
  const mutationError = createMutation.error || updateMutation.error
  const errorMessage =
    (mutationError
      ? (mutationError as AxiosError<ApiResponse>)?.response?.data?.message ||
        'Terjadi kesalahan saat menyimpan data'
      : null) ||
    (firstError ? firstError.message || 'Terjadi kesalahan pada input' : null)

  const onSubmit = async (
    data: CreateExpenseFormData | UpdateExpenseFormData
  ) => {
    try {
      let attachmentUrls: string[] = []

      // 1. Upload files first if any
      const filesToUpload = (data.images || []).filter(
        (item) => item instanceof File
      ) as File[]

      if (filesToUpload.length > 0) {
        const uploadResponse = await uploadAttachments.mutateAsync({
          feature: 'expenses',
          images: filesToUpload,
        })
        attachmentUrls = uploadResponse.data?.urls || []
      }

      // 2. Prepare final payload with uploaded URLs
      const payload = {
        ...data,
        images: attachmentUrls,
      }

      if (isEdit && currentRow) {
        const updateData: UpdateExpenseFormData = {
          ...payload,
          id: currentRow.id,
        } as unknown as UpdateExpenseFormData
        const response = await updateMutation.mutateAsync(updateData)

        form.reset(data)
        navigate({
          to: `/expenses/detail`,
          state: { currentRowId: response.data.id } as Record<string, unknown>,
        })
      } else {
        const response = await createMutation.mutateAsync(
          payload as unknown as CreateExpenseFormData
        )

        await generateNextNumber.mutateAsync(FinanceNumberType.expense)
        form.reset()
        navigate({
          to: `/expenses/detail`,
          state: { currentRowId: response.data.id } as Record<string, unknown>,
        })
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Terjadi kesalahan sistem'
      toast.error(message)    }
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
    errorMessage,
  }
}

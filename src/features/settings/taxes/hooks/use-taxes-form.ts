import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ApiResponse, Tax } from '@/types'
import { useAuthStore } from '@/stores/auth-store'
import {
  createTaxesSchema,
  type CreateTaxesFormData,
  type UpdateTaxesFormData,
} from '../types/taxes.schema'
import {
  useCreateTaxMutation,
  useUpdateTaxMutation,
} from './use-taxes-mutation'
import type { AxiosError } from 'axios'

type useTaxesFormProps = {
  currentRow?: Tax
}

export function useTaxesForm({ currentRow }: useTaxesFormProps) {
  const company = useAuthStore((state) => state.auth.user?.company)

  const isEdit = !!currentRow
  const form = useForm<CreateTaxesFormData>({
    resolver: zodResolver(createTaxesSchema),
    defaultValues: isEdit
      ? {
          name: currentRow?.name || '',
          rate: currentRow?.rate || 0,
          company_id: currentRow?.company?.id ?? company?.id ?? '',
          description: currentRow?.description || '',
        }
      : {
          company_id: company?.id ?? '',
          name: '',
          description: '',
        },
  })

  const createMutation = useCreateTaxMutation()
  const updateMutation = useUpdateTaxMutation()

  const errors = form.formState.errors
  const firstError = Object.values(errors)[0]
  const mutationError = createMutation.error || updateMutation.error
  const errorMessage =
    (mutationError
      ? (mutationError as AxiosError<ApiResponse>)?.response?.data?.message ||
        'Terjadi kesalahan saat menyimpan data'
      : null) ||
    (firstError ? firstError.message || 'Terjadi kesalahan pada input' : null)

  const onSubmit = async (data: CreateTaxesFormData) => {
    if (isEdit && currentRow) {
      const updateData: UpdateTaxesFormData = {
        id: currentRow.id,
        name: data.name,
        rate: data.rate,
        description: data.description,
      }
      await updateMutation.mutateAsync(updateData)
      form.reset()
    } else {
      await createMutation.mutateAsync(data)
      form.reset()
    }
  }

  return {
    form,
    onSubmit,
    isSubmitting: createMutation.isPending || updateMutation.isPending,
    errorMessage,
  }
}

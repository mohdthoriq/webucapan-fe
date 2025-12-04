import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { PaymentTerm } from '@/types'
import { useAuthStore } from '@/stores/auth-store'
import {
  createPaymentTermsSchema,
  type CreatePaymentTermsFormData,
  type UpdatePaymentTermsFormData,
} from '../types/payment-terms.schema'
import {
  useCreatePaymentTermMutation,
  useUpdatePaymentTermMutation,
} from './use-payment-terms-mutation'

type usePaymentTermsFormProps = {
  currentRow?: PaymentTerm
}

export function usePaymentTermsForm({ currentRow }: usePaymentTermsFormProps) {
  const company = useAuthStore((state) => state.auth.user?.company)

  const isEdit = !!currentRow
  const form = useForm<CreatePaymentTermsFormData>({
    resolver: zodResolver(createPaymentTermsSchema),
    defaultValues: isEdit
      ? {
          company_id: currentRow?.company?.id ?? company?.id ?? '',
          name: currentRow?.name || '',
          days: currentRow?.days || 0,
          description: currentRow?.description || '',
        }
      : {
          company_id: company?.id ?? '',
          name: '',
          days: 0,
          description: '',
        },
  })

  const createMutation = useCreatePaymentTermMutation()
  const updateMutation = useUpdatePaymentTermMutation()

  const onSubmit = async (data: CreatePaymentTermsFormData) => {
    if (isEdit && currentRow) {
      const updateData: UpdatePaymentTermsFormData = {
        id: currentRow.id,
        name: data.name,
        days: data.days,
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
  }
}

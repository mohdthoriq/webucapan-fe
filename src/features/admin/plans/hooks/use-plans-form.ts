import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Plan } from '@/types'
import {
  createPlanSchema,
  type CreatePlanFormData,
  type UpdatePlanFormData,
} from '../types/plans.schema'
import {
  useCreatePlanMutation,
  useUpdatePlanMutation,
} from './use-plans-mutation'

type usePlansFormProps = {
  currentRow?: Plan
}

export function usePlansForm({ currentRow }: usePlansFormProps) {
  const isEdit = !!currentRow
  const form = useForm<CreatePlanFormData>({
    resolver: zodResolver(createPlanSchema),
    defaultValues: {
      code: '',
      name: '',
      description: '',
      monthly_price: 0,
      yearly_price: 0,
      features: [],
      is_active: true,
    },
  })

  useEffect(() => {
    if (currentRow) {
      form.reset({
        code: currentRow?.code,
        name: currentRow?.name,
        description: currentRow?.description || '',
        monthly_price: Number(currentRow?.monthly_price) || 0,
        yearly_price: Number(currentRow?.yearly_price) || 0,
        features: currentRow?.features || [],
        is_active: currentRow?.is_active,
      })
    } else {
      form.reset({
        code: '',
        name: '',
        description: '',
        monthly_price: 0,
        yearly_price: 0,
        features: [],
        is_active: true,
      })
    }
  }, [currentRow, form])

  const createMutation = useCreatePlanMutation()
  const updateMutation = useUpdatePlanMutation()

  const onSubmit = async (data: CreatePlanFormData) => {
    if (isEdit && currentRow) {
      const updateData: UpdatePlanFormData = {
        id: currentRow.id,
        ...data,
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

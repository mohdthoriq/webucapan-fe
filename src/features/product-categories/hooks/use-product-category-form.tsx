import type { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ProductCategory } from '@/types'
import type { ApiResponse } from '@/types/api/response'
import {
  type CreateProductCategoryFormData,
  createProductCategorySchema,
  type UpdateProductCategoryFormData,
} from '../types/product-category.schema'
import {
  useCreateProductCategoryMutation,
  useUpdateProductCategoryMutation,
} from './use-product-category-mutation'

type useProductCategoryFormProps = {
  currentRow?: ProductCategory
}

export function useProductCategoryForm({
  currentRow,
}: useProductCategoryFormProps) {
  const isEdit = !!currentRow
  const form = useForm<CreateProductCategoryFormData>({
    resolver: zodResolver(createProductCategorySchema),
    defaultValues: isEdit
      ? {
          name: currentRow?.name,
          description: currentRow?.description,
        }
      : {
          name: '',
          description: '',
        },
  })

  const createMutation = useCreateProductCategoryMutation()
  const updateMutation = useUpdateProductCategoryMutation()

  const errors = form.formState.errors
  const firstError = Object.values(errors)[0]

  const mutationError = createMutation.error || updateMutation.error
  const errorMessage =
    (mutationError
      ? (mutationError as AxiosError<ApiResponse>).response?.data?.message ||
        mutationError.message
      : undefined) ||
    (firstError && 'message' in firstError
      ? (firstError.message as string)
      : undefined)

  const onSubmit = async (data: CreateProductCategoryFormData) => {
    if (isEdit && currentRow) {
      const updateData: UpdateProductCategoryFormData = {
        id: currentRow.id,
        name: data.name,
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

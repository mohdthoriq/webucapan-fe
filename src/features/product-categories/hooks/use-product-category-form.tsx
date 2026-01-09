import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ProductCategory } from '@/types'
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
  }
}

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Product } from '@/types'
import {
  type CreateProductFormData,
  createProductSchema,
  type UpdateProductFormData,
} from '../types/products.schema'
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from './use-products-mutation'

type useProductsFormProps = {
  currentRow?: Product
}

export function useProductsForm({ currentRow }: useProductsFormProps) {
  const isEdit = !!currentRow
  const form = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: isEdit
      ? {
          sku: currentRow?.sku ?? '',
          name: currentRow?.name ?? '',
          description: currentRow?.description ?? '',
          purchase_price: currentRow?.purchase_price ?? 0,
          sale_price: currentRow?.sale_price ?? 0,
          taxable: currentRow?.taxable ?? false,
          unit_id: currentRow?.unit_id.id ?? '',
          product_category_id: currentRow?.product_category_id.id ?? '',
          images: currentRow?.images ?? [],
        }
      : {
          sku: '',
          name: '',
          description: '',
          purchase_price: 0,
          sale_price: 0,
          taxable: false,
          unit_id: '',
          product_category_id: '',
          images: [],
        },
  })

  const createMutation = useCreateProductMutation()
  const updateMutation = useUpdateProductMutation()

  const onSubmit = async (data: CreateProductFormData) => {
    if (isEdit && currentRow) {
      const updateData: UpdateProductFormData = {
        id: currentRow.id,
        sku: data.sku,
        name: data.name,
        description: data.description,
        purchase_price: data.purchase_price,
        sale_price: data.sale_price,
        taxable: data.taxable,
        unit_id: data.unit_id,
        product_category_id: data.product_category_id,
        images: data.images,
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

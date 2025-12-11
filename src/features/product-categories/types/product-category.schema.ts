import { z } from 'zod'

export const createProductCategorySchema = z.object({
  name: z.string().min(1, 'Nama kategori harus diisi'),
  description: z.string().optional(),
})

export type CreateProductCategoryFormData = z.infer<typeof createProductCategorySchema>

export const updateProductCategorySchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, 'Nama kategori harus diisi'),
  description: z.string().optional(),
})

export type UpdateProductCategoryFormData = z.infer<typeof updateProductCategorySchema>

export const deleteProductCategorySchema = z.object({
  id: z.uuid(),
})

export type DeleteProductCategoryFormData = z.infer<typeof deleteProductCategorySchema>

import { z } from 'zod'

export const createPackageSchema = z.object({
  name: z.string().min(1, 'Nama plan wajib diisi'),
  monthly_price: z.number().nonnegative('Harga bulanan tidak boleh negatif'),
  yearly_price: z.number().nonnegative('Harga tahunan tidak boleh negatif'),
  description: z.string().optional(),
  features: z.array(z.string()).min(1, 'Fitur minimal 1'),
  is_active: z.boolean().optional(),
})

export type CreatePackageFormData = z.infer<typeof createPackageSchema>

export const updatePackageSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, 'Nama plan wajib diisi'),
  monthly_price: z.number().nonnegative('Harga bulanan tidak boleh negatif'),
  yearly_price: z.number().nonnegative('Harga tahunan tidak boleh negatif'),
  description: z.string().optional(),
  features: z.array(z.string()).min(1, 'Fitur minimal 1'),
  is_active: z.boolean().optional(),
})

export type UpdatePackageFormData = z.infer<typeof updatePackageSchema>

export const deletePackageSchema = z.object({
  id: z.uuid(),
})

export type DeletePackageFormData = z.infer<typeof deletePackageSchema>

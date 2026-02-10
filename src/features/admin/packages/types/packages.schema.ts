import { z } from 'zod'

export const createPackageSchema = z.object({
  name: z.string().min(1, 'Nama plan wajib diisi'),
  monthly_price: z.number().min(1, 'Harga bulanan wajib diisi'),
  yearly_price: z.number().min(1, 'Harga tahunan wajib diisi'),
  description: z.string().optional(),
  features: z.array(z.string()).min(1, 'Fitur minimal 1'),
})

export type CreatePackageFormData = z.infer<typeof createPackageSchema>

export const updatePackageSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, 'Nama plan wajib diisi'),
  monthly_price: z.number().min(1, 'Harga bulanan wajib diisi'),
  yearly_price: z.number().min(1, 'Harga tahunan wajib diisi'),
  description: z.string().optional(),
  features: z.array(z.string()).min(1, 'Fitur minimal 1'),
})

export type UpdatePackageFormData = z.infer<typeof updatePackageSchema>

export const deletePackageSchema = z.object({
  id: z.uuid(),
})

export type DeletePackageFormData = z.infer<typeof deletePackageSchema>

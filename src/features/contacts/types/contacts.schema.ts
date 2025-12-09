import { z } from 'zod'

export const createContactSchema = z.object({
  name: z.string().min(1, 'Nama kontak harus diisi'),
  type_id: z.string().min(1, 'Tipe kontak harus diisi'),
  company_id: z.string().min(1, 'Perusahaan harus diisi'),
  phone: z.string().optional(),
  email: z.email('Email tidak valid').optional().or(z.literal('')),
  address: z.string().optional(),
})

export type CreateContactFormData = z.infer<typeof createContactSchema>

export const updateContactSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, 'Nama kontak harus diisi'),
  type_id: z.string().min(1, 'Tipe kontak harus diisi'),
  company_id: z.string().min(1, 'Perusahaan harus diisi'),
  phone: z.string().optional(),
  email: z.email('Email tidak valid').optional().or(z.literal('')),
  address: z.string().optional(),
})

export type UpdateContactFormData = z.infer<typeof updateContactSchema>

export const deleteContactSchema = z.object({
  id: z.uuid(),
})

export type DeleteContactFormData = z.infer<typeof deleteContactSchema>

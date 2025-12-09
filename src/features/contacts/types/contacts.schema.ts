import { z } from 'zod'

export const createContactSchema = z.object({
    name: z.string().min(1, 'Nama kontak harus diisi'),
    type_id: z.string().min(1, 'Jenis kontak harus diisi'),
    company_id: z.string().min(1, 'Perusahaan harus diisi'),
    phone: z.string().min(1, 'Nomor telepon harus diisi'),
    email: z.email('Email tidak valid'),
    address: z.string().min(1, 'Alamat harus diisi'),
})

export type CreateContactFormData = z.infer<typeof createContactSchema>

export const updateContactSchema = z.object({
    id: z.uuid(),
    name: z.string().min(1, 'Nama kontak harus diisi'),
    type_id: z.string().min(1, 'Jenis kontak harus diisi'),
    company_id: z.string().min(1, 'Perusahaan harus diisi'),
    phone: z.string().min(1, 'Nomor telepon harus diisi'),
    email: z.email('Email tidak valid'),
    address: z.string().min(1, 'Alamat harus diisi'),
})

export type UpdateContactFormData = z.infer<typeof updateContactSchema>

export const deleteContactSchema = z.object({
    id: z.uuid(),
})

export type DeleteContactFormData = z.infer<typeof deleteContactSchema>
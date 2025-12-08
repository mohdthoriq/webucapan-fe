import { z } from 'zod'

export const createContactSchema = z.object({
    name: z.string().min(1, 'Nama kontak harus diisi'),
    contact_type: z.string().min(1, 'Jenis kontak harus diisi'),
    company_name: z.string().min(1, 'Perusahaan harus diisi'),
    phone: z.string().min(1, 'Nomor telepon harus diisi'),
    email: z.email('Email tidak valid'),
})

export type CreateContactFormData = z.infer<typeof createContactSchema>

export const updateContactSchema = z.object({
    id: z.string().min(1, 'ID kontak harus diisi'),
    name: z.string().min(1, 'Nama kontak harus diisi'),
    contact_type: z.string().min(1, 'Jenis kontak harus diisi'),
    company_name: z.string().min(1, 'Perusahaan harus diisi'),
    phone: z.string().min(1, 'Nomor telepon harus diisi'),
    email: z.email('Email tidak valid'),
})


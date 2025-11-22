import { z } from 'zod'

export const companySettingsSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Nama perusahaan minimal 2 karakter' })
    .max(200, { message: 'Nama perusahaan maksimal 200 karakter' }),
  address: z
    .string()
    .min(5, { message: 'Alamat minimal 5 karakter' })
    .max(500, { message: 'Alamat maksimal 500 karakter' }),
})

export type CompanySettingsFormData = z.infer<typeof companySettingsSchema>

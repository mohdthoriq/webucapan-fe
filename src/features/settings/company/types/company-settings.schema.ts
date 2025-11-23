import { z } from 'zod'

export const companySettingsSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Nama perusahaan minimal 2 karakter' })
    .max(200, { message: 'Nama perusahaan maksimal 200 karakter' })
    .optional(),
  npwp: z
    .string()
    .min(15, { message: 'NPWP minimal 15 karakter' })
    .max(16, { message: 'NPWP maksimal 16 karakter' })
    .optional(),
  address: z
    .string()
    .min(5, { message: 'Alamat minimal 5 karakter' })
    .max(500, { message: 'Alamat maksimal 500 karakter' })
    .optional(),
  logo_url: z
    .union([
      z.url({ message: 'URL logo tidak valid' }),
      z.literal(''),
      z.null(),
      z.undefined(),
    ])
    .optional()
    .nullable(),
})

export type CompanySettingsFormData = z.infer<typeof companySettingsSchema>

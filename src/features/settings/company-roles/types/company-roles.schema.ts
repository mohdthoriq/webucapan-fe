import { z } from 'zod'

export const companyRoleSettingsSchema = z.object({
  name: z.string(),
  description: z.string(),
  company_id: z.string(),
})

export type CompanyRoleSettingsFormData = z.infer<
  typeof companyRoleSettingsSchema
>

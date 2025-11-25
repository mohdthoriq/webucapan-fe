import { z } from 'zod'

export const createCompanyRoleSettingsSchema = z.object({
  name: z.string(),
  description: z.string(),
  company_id: z.string(),
})

export type CreateCompanyRoleSettingsFormData = z.infer<
  typeof createCompanyRoleSettingsSchema
>

export const updateCompanyRoleSettingsSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string(),
})

export type UpdateCompanyRoleSettingsFormData = z.infer<
  typeof updateCompanyRoleSettingsSchema
>

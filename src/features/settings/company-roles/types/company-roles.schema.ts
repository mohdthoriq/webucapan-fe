import { z } from 'zod'

// export const permissionsSchema = z.array(z.string())

export const companyRoleSettingsSchema = z.object({
  name: z.string(),
  description: z.string(),
  // permissions: permissionsSchema,
  // userCount: z.number(),
  // isActive: z.boolean(),
  // createdAt: z.coerce.date(),
  // updatedAt: z.coerce.date(),
})

export type CompanyRoleSettingsFormData = z.infer<
  typeof companyRoleSettingsSchema
>

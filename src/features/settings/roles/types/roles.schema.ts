import { z } from 'zod'

export const permissionsSchema = z.array(z.string())

export const roleSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  permissions: permissionsSchema,
  userCount: z.number(),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Role = z.infer<typeof roleSchema>

export const roleListSchema = z.array(roleSchema)
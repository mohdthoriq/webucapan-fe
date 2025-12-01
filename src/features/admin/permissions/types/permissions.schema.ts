import { z } from 'zod'

export const createPermissionSchema = z.object({
  name: z.string(),
  description: z.string(),
  parent_id: z.string(),
})

export type CreatePermissionFormData = z.infer<typeof createPermissionSchema>

export const updatePermissionSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string(),
  parent_id: z.string(),
})

export type UpdatePermissionFormData = z.infer<typeof updatePermissionSchema>

export const deletePermissionSchema = z.object({
  id: z.uuid(),
})

export type DeletePermissionFormData = z.infer<typeof deletePermissionSchema>

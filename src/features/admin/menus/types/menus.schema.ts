import { z } from 'zod'

export const createMenusSchema = z.object({
  name: z.string(),
  title: z.string(),
  parent_id: z.string(),
  position: z.number().min(1, { message: 'Posisi minimal 1' }),
  icon: z.string(),
  url: z.string(),
  permission_id: z.string(),
  is_divider: z.boolean(),
  is_active: z.boolean(),
})

export type CreateMenusFormData = z.infer<typeof createMenusSchema>

export const updateMenusSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  title: z.string(),
  parent_id: z.string(),
  position: z.number().min(1, { message: 'Posisi minimal 1' }),
  icon: z.string(),
  url: z.string(),
  permission_id: z.string(),
  is_divider: z.boolean(),
  is_active: z.boolean(),
})

export type UpdateMenusFormData = z.infer<typeof updateMenusSchema>

export const deleteMenusSchema = z.object({
  id: z.uuid(),
})

export type DeleteMenusFormData = z.infer<typeof deleteMenusSchema>

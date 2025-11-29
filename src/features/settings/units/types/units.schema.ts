import { z } from 'zod'

export const createUnitSchema = z.object({
  name: z.string(),
  code: z.string(),
  company_id: z.string(),
})

export type CreateUnitFormData = z.infer<typeof createUnitSchema>

export const updateUnitSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  code: z.string(),
})

export type UpdateUnitFormData = z.infer<typeof updateUnitSchema>

export const deleteUnitSchema = z.object({
  id: z.uuid(),
})

export type DeleteUnitFormData = z.infer<typeof deleteUnitSchema>

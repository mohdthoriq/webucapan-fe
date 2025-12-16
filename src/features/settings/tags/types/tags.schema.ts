import { z } from 'zod'

export const createTagSchema = z.object({
  name: z.string().min(1, 'Nama tag tidak boleh kosong'),
  description: z.string().optional(),
})

export type CreateTagFormData = z.infer<typeof createTagSchema>

export const updateTagSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, 'Nama tag tidak boleh kosong'),
  description: z.string().optional(),
})

export type UpdateTagFormData = z.infer<typeof updateTagSchema>

export const deleteTagSchema = z.object({
  id: z.uuid().min(1, 'ID tag tidak boleh kosong'),
})

export type DeleteTagFormData = z.infer<typeof deleteTagSchema>

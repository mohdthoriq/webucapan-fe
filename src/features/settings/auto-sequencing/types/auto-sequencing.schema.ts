import { z } from 'zod'

export const autoSequencingFormSchema = z.object({
  format: z.string().min(1, 'Format is required'),
  current_number: z.number().min(1, 'Current number is required'),
  reset_frequency: z.enum(['never', 'monthly', 'yearly']),
})

export type AutoSequencingFormValues = z.infer<typeof autoSequencingFormSchema>

import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { Settings } from '@/features/settings'

const searchSchema = z.object({
  tab: z.string().optional(),
})

export const Route = createFileRoute('/_authenticated/settings/')({
  component: Settings,
  validateSearch: (search) => searchSchema.parse(search),
})

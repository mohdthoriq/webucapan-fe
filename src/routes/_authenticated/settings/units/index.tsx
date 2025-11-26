import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import Units from '@/features/master-data/units'

const unitSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  name: z.string().optional().catch(''),
})

export const Route = createFileRoute('/_authenticated/settings/units/')({
  validateSearch: unitSearchSchema,
  component: Units,
})

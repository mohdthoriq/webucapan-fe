import { SalesOverview } from '@/features/sales/overview'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/sales/overview/')({
  component: SalesOverview,
})

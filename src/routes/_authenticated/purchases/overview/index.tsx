import { SalesOverview } from '@/features/purchases/overview'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/purchases/overview/')({
  component: SalesOverview,
})

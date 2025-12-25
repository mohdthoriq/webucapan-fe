import { AutoSequencing } from '@/features/settings/auto-sequencing'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/settings/auto-sequencing/',
)({
  component: AutoSequencing,
})

import Tags from '@/features/settings/tags'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/settings/tags/')({
  component: Tags,
})

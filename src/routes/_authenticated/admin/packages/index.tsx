import { createFileRoute } from '@tanstack/react-router'
import Packages from '@/features/admin/packages'

export const Route = createFileRoute('/_authenticated/admin/packages/')({
  component: Packages,
})

import { createFileRoute } from '@tanstack/react-router'
import { RoleFormPage } from '@/features/settings/company-roles/components/role-form-page'

export const Route = createFileRoute(
  '/_authenticated/settings/company-roles/edit/'
)({
  component: RoleFormPage,
})


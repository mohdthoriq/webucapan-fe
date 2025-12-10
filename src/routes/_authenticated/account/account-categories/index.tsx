import AccountCategories from '@/features/account/account-categories'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/account/account-categories/',
)({
  component: AccountCategories,
})

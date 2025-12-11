import { createFileRoute } from '@tanstack/react-router'
import AccountTypes from '@/features/admin/account-types'

export const Route = createFileRoute('/_authenticated/admin/account-types/')({
  component: AccountTypes,
})

import AccountTypes from '@/features/account/account-types'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/account/account-types/')({
  component: AccountTypes,
})


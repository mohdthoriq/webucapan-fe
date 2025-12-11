import Account from '@/features/account'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/account/')({
  component: Account,
})

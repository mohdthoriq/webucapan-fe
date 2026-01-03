import { ExpensesDetail } from '@/features/expenses/expenses-detail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/expenses/detail/')({
  component: ExpensesDetail,
})

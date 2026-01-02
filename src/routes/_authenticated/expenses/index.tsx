import ExpensesLists from '@/features/expenses/expenses-lists'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/expenses/')({
  component: ExpensesLists,
})

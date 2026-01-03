import { ExpensesFormPage } from '@/features/expenses/expenses-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/expenses/edit/')({
  component: ExpensesFormPage,
})

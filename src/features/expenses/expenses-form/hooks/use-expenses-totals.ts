import { useWatch, useFormContext } from 'react-hook-form'
import type { Tax } from '@/types'
import { calculateTotals } from '../lib/calculateTotal'
import type {
  CreateExpenseFormData,
  UpdateExpenseFormData,
} from '../types/expenses-form.schema'

export function useExpensesTotals(taxes: Tax[]) {
  const form = useFormContext<CreateExpenseFormData | UpdateExpenseFormData>()

  // Subscribe to changes in expense_items to trigger re-render of this hook
  const expenseItems = useWatch({
    control: form.control,
    name: 'expense_items',
  })

  // Calculate totals using the current form values
  // calculateTotals handles updating the form values (subtotal, total, etc)
  // and returns the calculated values for display
  return calculateTotals(form, expenseItems, taxes)
}

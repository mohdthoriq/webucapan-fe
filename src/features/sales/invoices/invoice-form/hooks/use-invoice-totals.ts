import { useWatch, useFormContext } from 'react-hook-form'
import type { Tax } from '@/types'
import { calculateTotals } from '../lib/calculateTotal'
import type {
  CreateInvoiceFormData,
  UpdateInvoiceFormData,
} from '../types/invoice-form.schema'

export function useInvoiceTotals(taxes: Tax[]) {
  const form = useFormContext<CreateInvoiceFormData | UpdateInvoiceFormData>()

  const [invoiceItems, additionalDiscounts, transactionFees, deductions] =
    useWatch({
      control: form.control,
      name: [
        'sales_invoice_items',
        'additional_discounts',
        'transaction_fees',
        'deductions',
        'shipping_fee',
      ],
    })

  // Calculate totals using the current form values
  // calculateTotals handles updating the form values (subtotal, total, etc)
  // and returns the calculated values for display
  return calculateTotals(
    form,
    invoiceItems,
    additionalDiscounts,
    transactionFees,
    deductions,
    taxes
  )
}

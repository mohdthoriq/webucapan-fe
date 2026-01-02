import type { useForm } from 'react-hook-form'
import type { Tax } from '@/types'
import type {
  CreateInvoiceFormData,
  UpdateInvoiceFormData,
} from '../types/expenses-form.schema'

export const calculateTotals = (
  form: Pick<ReturnType<
    typeof useForm<CreateInvoiceFormData | UpdateInvoiceFormData>
  >, 'setValue' | 'getValues'>,
  items: (CreateInvoiceFormData | UpdateInvoiceFormData)['invoice_items'],
  taxes: Tax[]
) => {
  let newSubtotal = 0
  let newTaxTotal = 0
  let newTotal = 0
  const taxBreakdown: Record<string, number> = {}

  items.forEach((item) => {
    const quantity = Number(item.quantity) || 0
    const unitPrice = Number(item.unit_price) || 0
    const discount = Number(item.discount) || 0

    const discountAmount = (quantity * unitPrice * discount) / 100
    const lineTotal = quantity * unitPrice - discountAmount
    newSubtotal += lineTotal

    if (item.tax_id) {
      const tax = taxes.find((t) => t.id === item.tax_id)
      if (tax) {
        const itemTax = (quantity * unitPrice * tax.rate) / 100
        newTaxTotal += itemTax

        if (tax.name) {
          taxBreakdown[tax.name] = (taxBreakdown[tax.name] || 0) + itemTax
        }
      }
    }
  })

  newTotal = newSubtotal + newTaxTotal

  if (form.getValues('subtotal') !== newSubtotal)
    form.setValue('subtotal', newSubtotal)
  if (form.getValues('tax_total') !== newTaxTotal)
    form.setValue('tax_total', newTaxTotal)
  if (form.getValues('total') !== newTotal) form.setValue('total', newTotal)

  return {
    subtotal: newSubtotal,
    taxTotal: newTaxTotal,
    total: newTotal,
    taxBreakdown,
  }
}

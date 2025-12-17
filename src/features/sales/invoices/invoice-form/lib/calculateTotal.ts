import type { useForm } from "react-hook-form"
import type { CreateInvoiceFormData, UpdateInvoiceFormData } from "../types/invoice-form.schema"
import type { Tax } from "@/types"

export const calculateTotals = (form: ReturnType<typeof useForm<CreateInvoiceFormData | UpdateInvoiceFormData>>, taxes: Tax[]) => {
  const items = form.getValues('invoice_items')
  // const subtotal = items.reduce((acc, item) => acc + (item.total || 0), 0)
  // Simple tax calculation logic assuming exclusive tax or handle per item
  // For now just sum items total. Real world needs complex tax logic.
  // Let's assume item.total is (qty * price - discount) and tax is calculated separately

  // Recalculate everything based on current form values to be safe
  let newSubtotal = 0
  let newTaxTotal = 0
  let newTotal = 0

  items.forEach((item) => {
    const quantity = Number(item.quantity) || 0
    const unitPrice = Number(item.unit_price) || 0
    const discount = Number(item.discount) || 0

    const lineTotal = quantity * unitPrice - discount
    newSubtotal += lineTotal

    // Tax Logic
    if (item.tax_id) {
      const tax = taxes.find((t) => t.id === item.tax_id)
      if (tax) {
        newTaxTotal += (lineTotal * (tax.rate || 0)) / 100
      }
    }
  })

  newTotal = newSubtotal + newTaxTotal

  // We should ideally use setValue to update form state if these are form fields
  if (form.getValues('subtotal') !== newSubtotal)
    form.setValue('subtotal', newSubtotal)
  if (form.getValues('tax_total') !== newTaxTotal)
    form.setValue('tax_total', newTaxTotal)
  if (form.getValues('total') !== newTotal) form.setValue('total', newTotal)

  return { subtotal: newSubtotal, taxTotal: newTaxTotal, total: newTotal }
}

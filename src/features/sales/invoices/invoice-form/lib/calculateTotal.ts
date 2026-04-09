import type { useForm } from 'react-hook-form'
import type { Tax } from '@/types'
import {
  type CreateInvoiceFormData,
  type UpdateInvoiceFormData,
  UnitsType,
} from '../types/invoice-form.schema'

export const calculateTotals = (
  form: Pick<
    ReturnType<typeof useForm<CreateInvoiceFormData | UpdateInvoiceFormData>>,
    'setValue' | 'getValues'
  >,
  items: (CreateInvoiceFormData | UpdateInvoiceFormData)['sales_invoice_items'],
  additionalDiscounts: (
    | CreateInvoiceFormData
    | UpdateInvoiceFormData
  )['additional_discounts'],
  transactionFees: (
    | CreateInvoiceFormData
    | UpdateInvoiceFormData
  )['transaction_fees'],
  deductions: (CreateInvoiceFormData | UpdateInvoiceFormData)['deductions'],
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
        const itemTax = (lineTotal * tax.rate) / 100
        newTaxTotal += itemTax

        if (tax.name) {
          taxBreakdown[tax.name] = (taxBreakdown[tax.name] || 0) + itemTax
        }
      }
    }
  })

  let additionalDiscountsTotal = 0
  additionalDiscounts?.forEach((discount, index) => {
    const value = Number(discount.value) || 0
    const amount =
      discount.type === UnitsType.percent ? (newSubtotal * value) / 100 : value
    additionalDiscountsTotal += amount
    if (discount.amount !== amount) {
      form.setValue(`additional_discounts.${index}.amount`, amount)
    }
  })

  let transactionFeesTotal = 0
  transactionFees?.forEach((fee, index) => {
    const value = Number(fee.value) || 0
    const amount =
      fee.type === UnitsType.percent ? (newSubtotal * value) / 100 : value
    transactionFeesTotal += amount
    if (fee.amount !== amount) {
      form.setValue(`transaction_fees.${index}.amount`, amount)
    }
  })

  let deductionsTotal = 0
  deductions?.forEach((deduction, index) => {
    const value = Number(deduction.value) || 0
    const amount =
      deduction.type === UnitsType.percent ? (newSubtotal * value) / 100 : value
    deductionsTotal += amount
    if (deduction.amount !== amount) {
      form.setValue(`deductions.${index}.amount`, amount)
    }
  })

  newTotal =
    newSubtotal -
    additionalDiscountsTotal +
    newTaxTotal +
    transactionFeesTotal -
    deductionsTotal

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

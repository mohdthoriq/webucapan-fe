import { type ReactNode } from 'react'
import { useWatch } from 'react-hook-form'
import { useTaxesQuery } from '@/features/settings/taxes/hooks/use-taxes-query'
import type { useInvoiceForm } from '../hooks/use-invoice-form'
import { calculateTotals } from '../lib/calculateTotal'
import { InvoiceFormContext } from './invoice-form-context'

type UseInvoiceFormReturn = ReturnType<typeof useInvoiceForm>

type InvoiceFormProviderProps = {
  children: ReactNode
  value: UseInvoiceFormReturn
}

export function InvoiceFormProvider({
  children,
  value,
}: InvoiceFormProviderProps) {
  const { form } = value
  const { data: taxes } = useTaxesQuery({ page: 1, limit: 100 })

  useWatch({
    control: form.control,
    name: 'invoice_items',
  })

  const totals = calculateTotals(form, taxes?.data || [])

  return (
    <InvoiceFormContext.Provider value={{ ...value, totals }}>
      {children}
    </InvoiceFormContext.Provider>
  )
}

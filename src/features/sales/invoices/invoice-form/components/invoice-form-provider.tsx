import { type ReactNode, useMemo } from 'react'
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

  // Trigger re-render only when invoice_items change
  useWatch({
    control: form.control,
    name: 'invoice_items',
  })

  // Calculate totals - only re-run if form values actually change
  // Note: calculateTotals accesses form.getValues() internally, so it will get fresh data
  const totals = calculateTotals(form, taxes?.data || [])

  // Memoize the context value to prevent unnecessary re-renders in consumers
  // when references like 'value' change but content is same.
  // However, value comes from useInvoiceForm which returns new object every render.
  // Ideally useInvoiceForm should also be memoized, but for now we memoize the combined context.
  const contextValue = useMemo(
    () => ({
      ...value,
      totals,
    }),
    [value, totals]
  )

  return (
    <InvoiceFormContext.Provider value={contextValue}>
      {children}
    </InvoiceFormContext.Provider>
  )
}

import { createContext, useContext } from 'react'
import type { useInvoiceForm } from '../hooks/use-invoice-form'

type UseInvoiceFormReturn = ReturnType<typeof useInvoiceForm>

export type InvoiceFormContextType = UseInvoiceFormReturn & {
  totals: {
    subtotal: number
    taxTotal: number
    total: number
  }
}

export const InvoiceFormContext = createContext<InvoiceFormContextType | null>(
  null
)

export function useInvoiceFormContext() {
  const context = useContext(InvoiceFormContext)
  if (!context) {
    throw new Error(
      'useInvoiceFormContext must be used within a InvoiceFormProvider'
    )
  }
  return context
}

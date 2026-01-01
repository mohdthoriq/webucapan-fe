import type { PaginationMeta, PurchaseInvoice } from '@/types'
import { useInvoiceListQuery } from '../hooks/use-invoice-list-query'
import { createContext, type ReactNode, useContext } from 'react'

type InvoiceListsContextType = {
  invoiceListsData: PurchaseInvoice[]
  pagination: PaginationMeta
  isLoading: boolean
  isError: boolean
  paginationParams?: { page?: number; limit?: number; name?: string }
}

const InvoiceListsContext = createContext<InvoiceListsContextType | null>(null)

export function InvoiceListsProvider({
  children,
  paginationParams,
}: {
  children: ReactNode
  paginationParams?: { page?: number; limit?: number; name?: string }
}) {

  const {
    data: invoiceListsData,
    isLoading: isLoadingInvoiceLists,
    isError: isErrorInvoiceLists,
  } = useInvoiceListQuery(paginationParams)

  const invoiceListsProviderValues = {
    invoiceListsData: invoiceListsData?.data ?? [],
    pagination: invoiceListsData?.pagination ?? {
      page: 1,
      limit: 10,
      total: 0,
      total_pages: 1,
    },
    isLoading: isLoadingInvoiceLists,
    isError: isErrorInvoiceLists,
    paginationParams,
  }

  return <InvoiceListsContext value={invoiceListsProviderValues}>{children}</InvoiceListsContext>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useInvoiceLists = () => {
  const invoiceListsContext = useContext(InvoiceListsContext)

  if (!invoiceListsContext) {
    throw new Error('useInvoiceLists has to be used within <InvoiceListsContext>')
  }

  return invoiceListsContext
}

import React, { useState } from 'react'
import type { PaginationMeta, SalesInvoice } from '@/types'
import useDialogState from '@/hooks/use-dialog-state'
import { useInvoiceListQuery } from '../hooks/use-invoice-list-query'

type InvoiceListsDialogType = 'delete'

type InvoiceListsContextType = {
  open: InvoiceListsDialogType | null
  setOpen: (str: InvoiceListsDialogType | null) => void
  currentRow: SalesInvoice | null
  setCurrentRow: React.Dispatch<React.SetStateAction<SalesInvoice | null>>
  invoiceListsData: SalesInvoice[]
  pagination: PaginationMeta
  isLoading: boolean
  isError: boolean
  paginationParams?: { page?: number; limit?: number; name?: string }
}

const InvoiceListsContext = React.createContext<InvoiceListsContextType | null>(null)

export function InvoiceListsProvider({
  children,
  paginationParams,
}: {
  children: React.ReactNode
  paginationParams?: { page?: number; limit?: number; name?: string }
}) {
  const [open, setOpen] = useDialogState<InvoiceListsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<SalesInvoice | null>(null)

  const {
    data: invoiceListsData,
    isLoading: isLoadingInvoiceLists,
    isError: isErrorInvoiceLists,
  } = useInvoiceListQuery(paginationParams)

  const invoiceListsProviderValues = {
    open,
    setOpen,
    currentRow,
    setCurrentRow,
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
  const invoiceListsContext = React.useContext(InvoiceListsContext)

  if (!invoiceListsContext) {
    throw new Error('useInvoiceLists has to be used within <InvoiceListsContext>')
  }

  return invoiceListsContext
}

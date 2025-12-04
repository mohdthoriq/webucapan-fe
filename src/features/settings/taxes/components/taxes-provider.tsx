import React, { useState } from 'react'
import type { Tax, PaginationMeta } from '@/types'
import useDialogState from '@/hooks/use-dialog-state'
import { useTaxesQuery } from '../hooks/use-taxes-query'

type TaxesDialogType = 'view' | 'edit' | 'add' | 'delete'

type TaxesContextType = {
  open: TaxesDialogType | null
  setOpen: (str: TaxesDialogType | null) => void
  currentRow: Tax | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Tax | null>>
  taxesData: Tax[]
  isLoading: boolean
  isError: boolean
  pagination: PaginationMeta
  paginationParams?: { page?: number; limit?: number; name?: string }
}

const TaxesContext = React.createContext<TaxesContextType | null>(null)

export function TaxesProvider({
  children,
  paginationParams,
}: {
  children: React.ReactNode
  paginationParams?: { page?: number; limit?: number; name?: string }
}) {
  const [open, setOpen] = useDialogState<TaxesDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Tax | null>(null)

  const {
    data: taxesData,
    isLoading: isLoadingTaxes,
    isError: isErrorTaxes,
  } = useTaxesQuery(paginationParams)

  const taxesProviderValues = {
    open,
    setOpen,
    currentRow,
    setCurrentRow,
    taxesData: taxesData?.data ?? [],
    pagination: taxesData?.pagination ?? {
      page: 1,
      limit: 10,
      total: 0,
      total_pages: 1,
    },
    isLoading: isLoadingTaxes,
    isError: isErrorTaxes,
    paginationParams,
  }

  return <TaxesContext value={taxesProviderValues}>{children}</TaxesContext>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTaxes = () => {
  const taxesContext = React.useContext(TaxesContext)

  if (!taxesContext) {
    throw new Error('useTaxes has to be used within <TaxesContext>')
  }

  return taxesContext
}

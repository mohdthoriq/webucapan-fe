import { useState, createContext, useContext } from 'react'
import type { TransactionType } from '@/types'

interface TransactionTypesContextType {
  open: 'add' | 'edit' | 'delete' | null
  setOpen: (open: 'add' | 'edit' | 'delete' | null) => void
  currentRow: TransactionType | null
  setCurrentRow: (row: TransactionType | null) => void
}

const TransactionTypesContext = createContext<TransactionTypesContextType | null>(
  null
)

interface TransactionTypesProviderProps {
  children: React.ReactNode
}

export function TransactionTypesProvider({
  children,
}: TransactionTypesProviderProps) {
  const [open, setOpen] = useState<TransactionTypesContextType['open']>(null)
  const [currentRow, setCurrentRow] = useState<TransactionType | null>(null)

  return (
    <TransactionTypesContext.Provider
      value={{
        open,
        setOpen,
        currentRow,
        setCurrentRow,
      }}
    >
      {children}
    </TransactionTypesContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTransactionTypes = () => {
  const context = useContext(TransactionTypesContext)
  if (!context) {
    throw new Error('useTransactionTypes must be used within a TransactionTypesProvider')
  }
  return context
}

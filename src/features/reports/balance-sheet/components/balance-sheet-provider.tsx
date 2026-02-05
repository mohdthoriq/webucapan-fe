import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Period } from '@/features/sales/overview/types/sales-overview'

interface BalanceSheetContextType {
  selectedAccountId: string | null
  isOpen: boolean
  date: Date
  period: Period
  openDetail: (accountId: string) => void
  closeDetail: () => void
  setDate: (date: Date) => void
  setPeriod: (period: Period) => void
}

const BalanceSheetContext = createContext<BalanceSheetContextType | undefined>(
  undefined
)

export function BalanceSheetProvider({
  children,
  defaultDate,
}: {
  children: ReactNode
  defaultDate: Date
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null
  )
  const [date, setDate] = useState<Date>(defaultDate)
  const [period, setPeriod] = useState<Period>('month') // Default period

  const openDetail = (accountId: string) => {
    setSelectedAccountId(accountId)
    setIsOpen(true)
  }

  const closeDetail = () => {
    setIsOpen(false)
    setSelectedAccountId(null)
  }

  return (
    <BalanceSheetContext.Provider
      value={{
        selectedAccountId,
        isOpen,
        date,
        period,
        openDetail,
        closeDetail,
        setDate,
        setPeriod,
      }}
    >
      {children}
    </BalanceSheetContext.Provider>
  )
}

// eslint-disable-next-line
export function useBalanceSheetContext() {
  const context = useContext(BalanceSheetContext)
  if (!context) {
    throw new Error(
      'useBalanceSheetContext must be used within a BalanceSheetProvider'
    )
  }
  return context
}

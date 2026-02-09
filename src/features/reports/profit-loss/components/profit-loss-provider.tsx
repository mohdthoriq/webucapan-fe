import { createContext, useContext, useState, type ReactNode } from 'react'
import type { ProfitLossReportData } from '@/types'
import {
  useProfitLossReportQuery,
  Option,
  AccountDisplayOption,
} from '../hooks/use-profit-loss-report-query'

interface ProfitLossContextType {
  selectedAccountId: string | null
  data: ProfitLossReportData | null | undefined
  isLoading: boolean
  isOpen: boolean
  dateFrom: Date
  dateTo: Date
  openDetail: (accountId: string) => void
  closeDetail: () => void
  setDateRange: (from: Date, to: Date) => void
}

const ProfitLossContext = createContext<ProfitLossContextType | undefined>(
  undefined
)

export function ProfitLossProvider({
  children,
  defaultDateFrom,
  defaultDateTo,
}: {
  children: ReactNode
  defaultDateFrom: Date
  defaultDateTo: Date
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null
  )
  const [dateFrom, setDateFrom] = useState<Date>(defaultDateFrom)
  const [dateTo, setDateTo] = useState<Date>(defaultDateTo)

  const { data, isLoading } = useProfitLossReportQuery({
    date_from: dateFrom,
    date_to: dateTo,
    tag_id: '',
    currency_id: '',
    comparison_date_from: undefined as any,
    comparison_date_to: undefined as any,
    view_by: Option.Periode,
    comparison_periods: 0,
    sort_by: 'code',
    account_display: AccountDisplayOption.NameCode,
    hide_sub_account: false,
    separate_other_income_expense: false,
  })

  const openDetail = (accountId: string) => {
    setSelectedAccountId(accountId)
    setIsOpen(true)
  }

  const closeDetail = () => {
    setIsOpen(false)
    setSelectedAccountId(null)
  }

  const setDateRange = (from: Date, to: Date) => {
    setDateFrom(from)
    setDateTo(to)
  }

  return (
    <ProfitLossContext.Provider
      value={{
        selectedAccountId,
        isOpen,
        data,
        isLoading,
        dateFrom,
        dateTo,
        openDetail,
        closeDetail,
        setDateRange,
      }}
    >
      {children}
    </ProfitLossContext.Provider>
  )
}

export function useProfitLossContext() {
  const context = useContext(ProfitLossContext)
  if (!context) {
    throw new Error(
      'useProfitLossContext must be used within a ProfitLossProvider'
    )
  }
  return context
}

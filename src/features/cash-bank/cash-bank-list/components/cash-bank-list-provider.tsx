import { createContext, type ReactNode, useContext } from 'react'
import type { CashBankTransaction, PaginationMeta, TransactionData } from '@/types'
import {
  useCashBankListQuery,
  type CashBankListQueryParams,
} from '../hooks/use-cash-bank-query'

type CashBankListsContextType = {
  cashBankListsData: CashBankTransaction | null | undefined
  cashBankTransactionListsData: TransactionData[]
  pagination: PaginationMeta
  isLoading: boolean
  isError: boolean
  paginationParams?: CashBankListQueryParams
}

const CashBankListsContext = createContext<CashBankListsContextType | null>(
  null
)

export function CashBankListsProvider({
  children,
  paginationParams,
}: {
  children: ReactNode
  paginationParams?: CashBankListQueryParams
}) {
  const {
    data: cashBankListsData,
    isLoading: isLoadingCashBankLists,
    isError: isErrorCashBankLists,
  } = useCashBankListQuery(paginationParams)

  const cashBankListsProviderValues = {
    cashBankListsData: cashBankListsData,
    cashBankTransactionListsData: cashBankListsData?.transactions ?? [],
    pagination: cashBankListsData?.pagination ?? {
      page: 1,
      limit: 10,
      total: 0,
      total_pages: 1,
    },
    isLoading: isLoadingCashBankLists,
    isError: isErrorCashBankLists,
    paginationParams,
  }

  return (
    <CashBankListsContext value={cashBankListsProviderValues}>
      {children}
    </CashBankListsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCashBankLists = () => {
  const cashBankListsContext = useContext(CashBankListsContext)

  if (!cashBankListsContext) {
    throw new Error(
      'useCashBankLists has to be used within <CashBankListsContext>'
    )
  }

  return cashBankListsContext
}

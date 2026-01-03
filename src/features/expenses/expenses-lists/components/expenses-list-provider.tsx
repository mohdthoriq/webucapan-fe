import type { PaginationMeta, Expense } from '@/types'
import { useExpensesListQuery } from '../hooks/use-expenses-list-query'
import { createContext, type ReactNode, useContext } from 'react'

type ExpensesListsContextType = {
  expensesListsData: Expense[]
  pagination: PaginationMeta
  isLoading: boolean
  isError: boolean
  paginationParams?: { page?: number; limit?: number; name?: string }
}

const ExpensesListsContext = createContext<ExpensesListsContextType | null>(null)

export function ExpensesListsProvider({
  children,
  paginationParams,
}: {
  children: ReactNode
  paginationParams?: { page?: number; limit?: number; name?: string }
}) {

  const {
    data: expensesListsData,
    isLoading: isLoadingExpensesLists,
    isError: isErrorExpensesLists,
  } = useExpensesListQuery(paginationParams)

  const expensesListsProviderValues = {
    expensesListsData: expensesListsData?.data ?? [],
    pagination: expensesListsData?.pagination ?? {
      page: 1,
      limit: 10,
      total: 0,
      total_pages: 1,
    },
    isLoading: isLoadingExpensesLists,
    isError: isErrorExpensesLists,
    paginationParams,
  }

  return <ExpensesListsContext value={expensesListsProviderValues}>{children}</ExpensesListsContext>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useExpensesLists = () => {
  const expensesListsContext = useContext(ExpensesListsContext)

  if (!expensesListsContext) {
    throw new Error('useExpensesLists has to be used within <ExpensesListsContext>')
  }

  return expensesListsContext
}

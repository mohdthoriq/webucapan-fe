import { createContext, useContext, useState } from 'react'
import type { PaginationMeta, AccountType } from '@/types'
import useDialogState from '@/hooks/use-dialog-state'
import { useAccountTypesQuery } from '../hooks/use-account-types-query'

type AccountTypesDialogType = 'view' | 'edit' | 'add' | 'delete'

type AccountTypesContextType = {
  open: AccountTypesDialogType | null
  setOpen: (str: AccountTypesDialogType | null) => void
  currentRow: AccountType | null
  setCurrentRow: React.Dispatch<React.SetStateAction<AccountType | null>>
  accountTypesData: AccountType[]
  pagination: PaginationMeta
  isLoading: boolean
  isError: boolean
  paginationParams?: { page?: number; limit?: number; name?: string }
}

const AccountTypesContext = createContext<AccountTypesContextType | null>(null)

export function AccountTypesProvider({
  children,
  paginationParams,
}: {
  children: React.ReactNode
  paginationParams?: { page?: number; limit?: number; name?: string }
}) {
  const [open, setOpen] = useDialogState<AccountTypesDialogType>(null)
  const [currentRow, setCurrentRow] = useState<AccountType | null>(null)

  const {
    data: accountTypesData,
    isLoading: isLoadingAccountTypes,
    isError: isErrorAccountTypes,
  } = useAccountTypesQuery(paginationParams)

  const accountTypesProviderValues = {
    open,
    setOpen,
    currentRow,
    setCurrentRow,
    accountTypesData: accountTypesData?.data ?? [],
    pagination: accountTypesData?.pagination ?? {
      page: 1,
      limit: 10,
      total: 0,
      total_pages: 1,
    },
    isLoading: isLoadingAccountTypes,
    isError: isErrorAccountTypes,
    paginationParams,
  }

  return <AccountTypesContext value={accountTypesProviderValues}>{children}</AccountTypesContext>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAccountTypes = () => {
  const accountTypesContext = useContext(AccountTypesContext)

  if (!accountTypesContext) {
    throw new Error('useAccountTypes has to be used within <AccountTypesProvider>')
  }

  return accountTypesContext
}

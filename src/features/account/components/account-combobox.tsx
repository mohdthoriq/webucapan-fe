import { type ReactNode, useMemo } from 'react'
import type { Account } from '@/types'
import { useComboboxQuery } from '@/hooks/use-combobox-query'
import { ComboboxBase } from '@/components/combobox-base'
import {
  type AccountQueryParams,
  useAccountsQuery,
} from '../hooks/use-account-query'

interface AccountsComboboxProps {
  value?: string | null
  onValueChange?: (value: string | null) => void
  placeholder?: string
  limit?: number
  action?: ReactNode
  categoryId?: string
  disabled?: boolean
}

export function AccountsCombobox({
  value,
  onValueChange,
  placeholder = 'Pilih Akun',
  limit = 20,
  action,
  categoryId,
  disabled,
}: AccountsComboboxProps) {
  const {
    allItems,
    isLoading,
    isError,
    hasMore,
    refetch,
    loadMore,
    setSearchTerm,
  } = useComboboxQuery<Account, AccountQueryParams>({
    queryHook: useAccountsQuery,
    limit,
    extraParams: { category_id: categoryId },
    searchKey: 'search',
  })

  const selectedItem = useMemo(
    () => allItems.find((item) => item.id === value) || null,
    [allItems, value]
  )

  return (
    <ComboboxBase
      value={value || undefined}
      onValueChange={onValueChange}
      placeholder={placeholder}
      searchPlaceholder='Cari parent akun...'
      items={allItems}
      selectedItem={selectedItem}
      isLoading={isLoading}
      isError={isError}
      hasMore={hasMore}
      onSearch={setSearchTerm}
      onLoadMore={loadMore}
      onRetry={refetch}
      getLabel={(item) => item.name}
      renderItem={(item) => (
        <div className='flex flex-col'>
          <span className='font-medium'>{item.name}</span>
          <span className='text-muted-foreground text-xs'>
            {item.description}
          </span>
        </div>
      )}
      action={action}
      disabled={disabled}
    />
  )
}

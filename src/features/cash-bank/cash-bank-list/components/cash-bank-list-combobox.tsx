import { useMemo, type ReactNode } from 'react'
import type { Account, Contact } from '@/types'
import { useComboboxQuery } from '@/hooks/use-combobox-query'
import { ComboboxBase } from '@/components/combobox-base'
import { useAccountsQuery } from '@/features/account/hooks/use-account-query'
import { useContactsQuery } from '@/features/contacts/hooks/use-contacts-query'

interface CashBankListComboboxProps {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  limit?: number
  type?: 'contact' | 'account'
  excludeIds?: Set<string>
  action?: ReactNode
  contactTypeId?: string
  disabled?: boolean
}

export function CashBankListCombobox({
  type = 'contact',
  ...props
}: CashBankListComboboxProps) {
  if (type === 'account') {
    return <AccountCombobox {...props} />
  }
  return <ContactCombobox {...props} />
}

function ContactCombobox({
  value,
  onValueChange,
  placeholder = 'Pilih Vendor',
  limit = 20,
  action,
  contactTypeId,
  disabled,
}: Omit<CashBankListComboboxProps, 'type'>) {
  const {
    allItems,
    isLoading,
    isError,
    hasMore,
    refetch,
    loadMore,
    setSearchTerm,
  } = useComboboxQuery<
    Contact,
    { page?: number; limit?: number; name?: string; type_id?: string }
  >({
    queryHook: useContactsQuery,
    limit,
    extraParams: {
      type_id: contactTypeId,
    },
  })

  const selectedItem = useMemo(
    () => allItems.find((item) => item.id === value) || null,
    [allItems, value]
  )

  return (
    <ComboboxBase
      value={value}
      onValueChange={onValueChange}
      placeholder={placeholder}
      searchPlaceholder='Cari kontak...'
      items={allItems}
      selectedItem={selectedItem}
      isLoading={isLoading}
      isError={isError}
      hasMore={hasMore}
      onSearch={setSearchTerm}
      onLoadMore={loadMore}
      onRetry={refetch}
      action={action}
      disabled={disabled}
      getLabel={(item) => item.name}
      renderItem={(item) => (
        <div className='flex flex-col'>
          <span className='font-medium'>{item.name}</span>
          {item.company?.name && (
            <span className='text-muted-foreground text-xs'>
              {item.company.name}
            </span>
          )}
        </div>
      )}
    />
  )
}

function AccountCombobox({
  value,
  onValueChange,
  placeholder = 'Pilih Akun',
  limit = 20,
  excludeIds,
  action,
  disabled,
}: Omit<CashBankListComboboxProps, 'type'>) {
  const {
    allItems,
    isLoading,
    isError,
    hasMore,
    refetch,
    loadMore,
    setSearchTerm,
  } = useComboboxQuery<
    Account,
    { page?: number; limit?: number; name?: string }
  >({
    queryHook: useAccountsQuery,
    limit,
    searchKey: 'search',
  })

  const selectedItem = useMemo(
    () => allItems.find((item) => item.id === value) || null,
    [allItems, value]
  )

  const filteredItems = useMemo(() => {
    if (!excludeIds || excludeIds.size === 0) return allItems
    return allItems.filter(
      (item) => !excludeIds.has(item.id) || item.id === value
    )
  }, [allItems, excludeIds, value])

  return (
    <ComboboxBase
      value={value}
      onValueChange={onValueChange}
      placeholder={placeholder}
      searchPlaceholder='Cari akun...'
      items={filteredItems}
      selectedItem={selectedItem}
      isLoading={isLoading}
      isError={isError}
      hasMore={hasMore}
      onSearch={setSearchTerm}
      onLoadMore={loadMore}
      onRetry={refetch}
      action={action}
      disabled={disabled}
      getLabel={(item) => item.name}
      renderItem={(item) => (
        <>
          <div className='flex flex-col'>
            <span className='font-medium'>
              {item.code} - {item.name}
            </span>
            <span className='text-muted-foreground text-xs'>
              {item.category.name}
            </span>
          </div>
          <hr />
        </>
      )}
    />
  )
}

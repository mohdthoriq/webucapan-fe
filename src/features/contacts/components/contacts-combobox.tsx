import { type ReactNode, useMemo } from 'react'
import type { Contact } from '@/types'
import { useComboboxQuery } from '@/hooks/use-combobox-query'
import { ComboboxBase } from '@/components/combobox-base'
import {
  type ContactQueryParams,
  useContactsQuery,
} from '../hooks/use-contacts-query'

export interface ContactComboboxProps {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  limit?: number
  action?: ReactNode
  contactTypeId?: string
  disabled?: boolean
  companyId?: string
}

export function ContactCombobox({
  value,
  onValueChange,
  placeholder = 'Pilih Vendor',
  limit = 20,
  action,
  contactTypeId,
  disabled,
  companyId,
}: ContactComboboxProps) {
  const {
    allItems,
    isLoading,
    isError,
    hasMore,
    refetch,
    loadMore,
    setSearchTerm,
  } = useComboboxQuery<Contact, ContactQueryParams>({
    queryHook: useContactsQuery,
    limit,
    extraParams: {
      type_id: contactTypeId,
      company_id: companyId,
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

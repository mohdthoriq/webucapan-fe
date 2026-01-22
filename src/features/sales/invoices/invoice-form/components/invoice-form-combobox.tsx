import { useMemo, type ReactNode } from 'react'
import type { Contact } from '@/types/domain/contact'
import type { Product } from '@/types/domain/product'
import { ComboboxBase } from '@/components/combobox-base'
import { useContactsQuery } from '@/features/contacts/hooks/use-contacts-query'
import { useProductsQuery } from '@/features/products/product-list/hooks/use-product-list-query'
import { useComboboxQuery } from '../hooks/use-combobox-query'

interface InvoiceFormComboboxProps {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  limit?: number
  type?: 'contact' | 'product'
  excludeIds?: string[]
  action?: ReactNode
  contactTypeId?: string
}

export function InvoiceFormCombobox({
  type = 'contact',
  ...props
}: InvoiceFormComboboxProps) {
  if (type === 'product') {
    return <ProductCombobox {...props} />
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
}: Omit<InvoiceFormComboboxProps, 'type'>) {
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
      searchPlaceholder='Cari vendor...'
      items={allItems}
      selectedItem={selectedItem}
      isLoading={isLoading}
      isError={isError}
      hasMore={hasMore}
      onSearch={setSearchTerm}
      onLoadMore={loadMore}
      onRetry={refetch}
      action={action}
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

function ProductCombobox({
  value,
  onValueChange,
  placeholder = 'Pilih Produk',
  limit = 20,
  action,
}: Omit<InvoiceFormComboboxProps, 'type'>) {
  const {
    allItems,
    isLoading,
    isError,
    hasMore,
    refetch,
    loadMore,
    setSearchTerm,
  } = useComboboxQuery<
    Product,
    { page?: number; limit?: number; name?: string }
  >({
    queryHook: useProductsQuery,
    limit,
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
      searchPlaceholder='Cari produk...'
      items={allItems}
      selectedItem={selectedItem}
      isLoading={isLoading}
      isError={isError}
      hasMore={hasMore}
      onSearch={setSearchTerm}
      onLoadMore={loadMore}
      onRetry={refetch}
      action={action}
      getLabel={(item) => item.name}
      renderItem={(item) => (
        <div className='flex flex-col'>
          <span className='font-medium'>{item.name}</span>
          <span className='text-muted-foreground text-xs'>
            SKU: {item.sku} • Rp{' '}
            {Number(item.sale_price).toLocaleString('id-ID')}
          </span>
        </div>
      )}
    />
  )
}

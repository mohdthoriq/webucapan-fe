'use client'

import * as React from 'react'
import type { AccountType } from '@/types'
import { CheckIcon, ChevronsUpDownIcon, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDebounce } from '@/hooks/use-debounce'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useAccountTypesQuery } from '@/features/admin/account-types/hooks/use-account-types-query'

interface AccountCategoriesComboboxProps {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  companyId?: string
  limit?: number
}

export function AccountCategoriesCombobox({
  value = '',
  onValueChange,
  placeholder = 'Select account type...',
  companyId,
  limit = 20,
}: AccountCategoriesComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [allAccountTypes, setAllAccountTypes] = React.useState<AccountType[]>(
    []
  )
  const [selectedAccountType, setSelectedAccountType] =
    React.useState<AccountType | null>(null)
  const [hasMore, setHasMore] = React.useState(true)

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const { data, isLoading, isError, refetch } = useAccountTypesQuery({
    page: currentPage,
    limit,
    name: debouncedSearchTerm || undefined,
    company_id: companyId,
  })

  React.useEffect(() => {
    setCurrentPage(1)
    setAllAccountTypes([])
    setHasMore(true)
  }, [debouncedSearchTerm, companyId])

  React.useEffect(() => {
    if (data?.data) {
      if (currentPage === 1) {
        setAllAccountTypes(data.data)
      } else {
        setAllAccountTypes((prev) => {
          const newAccountTypes = data.data.filter(
            (newAccountType) =>
              !prev.some(
                (existingAccountType) =>
                  existingAccountType.id === newAccountType.id
              )
          )
          return [...prev, ...newAccountTypes]
        })
      }

      const pagination = data.pagination
      if (pagination) {
        setHasMore(currentPage < pagination.total_pages)
      }
    }
  }, [data, currentPage])

  React.useEffect(() => {
    if (value && allAccountTypes.length > 0) {
      const accountType = allAccountTypes.find((p) => p.id === value)
      setSelectedAccountType(accountType || null)
    } else {
      setSelectedAccountType(null)
    }
  }, [value, allAccountTypes])

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue)
  }

  const handleSelect = (accountTypeId: string) => {
    const accountType = allAccountTypes.find((p) => p.id === accountTypeId)
    if (accountType) {
      setSelectedAccountType(accountType)
      onValueChange?.(accountTypeId)
      setOpen(false)
    }
  }

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      setSearchTerm('')
    }
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full min-w-[300px] justify-between'
        >
          {selectedAccountType ? selectedAccountType.name : placeholder}
          <ChevronsUpDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full min-w-[300px] p-0'>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder='Search account types...'
            value={searchTerm}
            onValueChange={handleSearch}
          />
          <CommandList>
            {isLoading && currentPage === 1 ? (
              <div className='flex items-center justify-center py-6'>
                <Loader2 className='h-4 w-4 animate-spin' />
                <span className='text-muted-foreground ml-2 text-sm'>
                  Loading...
                </span>
              </div>
            ) : isError ? (
              <CommandEmpty>
                <div className='flex flex-col items-center py-4'>
                  <span className='text-muted-foreground mb-2 text-sm'>
                    Failed to load account types
                  </span>
                  <Button variant='outline' size='sm' onClick={() => refetch()}>
                    Retry
                  </Button>
                </div>
              </CommandEmpty>
            ) : allAccountTypes.length === 0 ? (
              <CommandEmpty>No account types found.</CommandEmpty>
            ) : (
              <>
                <CommandGroup>
                  {allAccountTypes.map((accountType) => (
                    <CommandItem
                      key={accountType.id}
                      value={accountType.id}
                      onSelect={() => handleSelect(accountType.id)}
                    >
                      <CheckIcon
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === accountType.id ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      <div className='flex flex-col'>
                        <span className='font-medium'>{accountType.name}</span>
                        {accountType.name && (
                          <span className='text-muted-foreground text-xs'>
                            {accountType.name}
                          </span>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>

                {hasMore && (
                  <div className='border-t'>
                    <Button
                      variant='ghost'
                      className='w-full justify-center py-2'
                      onClick={loadMore}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                          Loading...
                        </>
                      ) : (
                        'Load more'
                      )}
                    </Button>
                  </div>
                )}
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

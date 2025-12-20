'use client'

import * as React from 'react'
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
import type { Account } from '@/types'
import { useAccountsQuery } from '@/features/account/hooks/use-account-query'

interface InvoicePaymentsComboboxProps {
  value?: string | null
  onValueChange?: (value: string | null) => void
  placeholder?: string
  limit?: number
}

export function InvoicePaymentsCombobox({
  value = '',
  onValueChange,
  placeholder = 'Select account parent...',
  limit = 20,
}: InvoicePaymentsComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [allAccounts, setAllAccounts] = React.useState<Account[]>(
    []
  )
  const [selectedContactType, setSelectedContactType] =
    React.useState<Account | null>(null)
  const [hasMore, setHasMore] = React.useState(true)

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const { data, isLoading, isError, refetch } = useAccountsQuery({
    page: currentPage,
    limit,
    search: debouncedSearchTerm || undefined,
  })

  React.useEffect(() => {
    setCurrentPage(1)
    setAllAccounts([])
    setHasMore(true)
  }, [debouncedSearchTerm])

  React.useEffect(() => {
    if (data?.data) {
      if (currentPage === 1) {
        setAllAccounts(data.data)
      } else {
        setAllAccounts((prev) => {
          const newAccounts = data.data.filter(
            (newAccount) =>
              !prev.some(
                (existingAccount) =>
                  existingAccount.id === newAccount.id
              )
          )
          return [...prev, ...newAccounts]
        })
      }

      const pagination = data.pagination
      if (pagination) {
        setHasMore(currentPage < pagination.total_pages)
      }
    }
  }, [data, currentPage])

  React.useEffect(() => {
    if (value && allAccounts.length > 0) {
      const account = allAccounts.find((p) => p.id === value)
      setSelectedContactType(account || null)
    } else {
      setSelectedContactType(null)
    }
  }, [value, allAccounts])

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue)
  }

  const handleSelect = (contactTypeId: string) => {
    const account = allAccounts.find((p) => p.id === contactTypeId)
    if (account) {
      setSelectedContactType(account)
      onValueChange?.(contactTypeId)
      setOpen(false)
    }
  }

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  // Reset when closing popover
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      setSearchTerm('')
    }
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild disabled={data?.data.length === 0}>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full min-w-[200px] justify-between'
        >
          {selectedContactType ? selectedContactType.name : placeholder}
          <ChevronsUpDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full min-w-[200px] p-0'>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder='Search account parents...'
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
                    Failed to load account parents
                  </span>
                  <Button variant='outline' size='sm' onClick={() => refetch()}>
                    Retry
                  </Button>
                </div>
              </CommandEmpty>
            ) : allAccounts.length === 0 ? (
              <CommandEmpty>No account parents found.</CommandEmpty>
            ) : (
              <>
                <CommandGroup>
                  {allAccounts.map((account) => (
                    <CommandItem
                      key={account.id}
                      value={account.id}
                      onSelect={() => handleSelect(account.id)}
                    >
                      <CheckIcon
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === account.id ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      <div className='flex gap-2'>
                        <span className='font-medium'>{account.code}</span>
                        <span>-</span>
                        <span className='font-medium'>{account.name}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>

                {/* Load more indicator */}
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

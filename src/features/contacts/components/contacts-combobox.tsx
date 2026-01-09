'use client'

import * as React from 'react'
import type { ContactType } from '@/types/domain/contact-type'
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
import { useContactTypesQuery } from '../hooks/use-contacts-query'

interface PermissionComboboxProps {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  companyId?: string
  limit?: number
}

export function ContactsCombobox({
  value = '',
  onValueChange,
  placeholder = 'Select contact types...',
  companyId,
  limit = 20,
}: PermissionComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [allContactTypes, setAllContactTypes] = React.useState<ContactType[]>(
    []
  )
  const [selectedContactType, setSelectedContactType] =
    React.useState<ContactType | null>(null)
  const [hasMore, setHasMore] = React.useState(true)

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const { data, isLoading, isError, refetch } = useContactTypesQuery({
    page: currentPage,
    limit,
    name: debouncedSearchTerm || undefined,
    company_id: companyId,
  })

  React.useEffect(() => {
    setCurrentPage(1)
    setAllContactTypes([])
    setHasMore(true)
  }, [debouncedSearchTerm, companyId])

  React.useEffect(() => {
    if (data?.data) {
      if (currentPage === 1) {
        setAllContactTypes(data.data)
      } else {
        setAllContactTypes((prev) => {
          const newContactTypes = data.data.filter(
            (newContactType) =>
              !prev.some(
                (existingContactType) =>
                  existingContactType.id === newContactType.id
              )
          )
          return [...prev, ...newContactTypes]
        })
      }

      const pagination = data.pagination
      if (pagination) {
        setHasMore(currentPage < pagination.total_pages)
      }
    }
  }, [data, currentPage])

  React.useEffect(() => {
    if (value && allContactTypes.length > 0) {
      const contactType = allContactTypes.find((p) => p.id === value)
      setSelectedContactType(contactType || null)
    } else {
      setSelectedContactType(null)
    }
  }, [value, allContactTypes])

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue)
  }

  const handleSelect = (contactTypeId: string) => {
    const contactType = allContactTypes.find((p) => p.id === contactTypeId)
    if (contactType) {
      setSelectedContactType(contactType)
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
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full min-w-[300px] justify-between'
        >
          {selectedContactType ? selectedContactType.name : placeholder}
          <ChevronsUpDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full min-w-[300px] p-0'>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder='Search contact types...'
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
                    Failed to load contact types
                  </span>
                  <Button variant='outline' size='sm' onClick={() => refetch()}>
                    Retry
                  </Button>
                </div>
              </CommandEmpty>
            ) : allContactTypes.length === 0 ? (
              <CommandEmpty>No contact types found.</CommandEmpty>
            ) : (
              <>
                <CommandGroup>
                  {allContactTypes.map((contactType) => (
                    <CommandItem
                      key={contactType.id}
                      value={contactType.id}
                      onSelect={() => handleSelect(contactType.id)}
                    >
                      <CheckIcon
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === contactType.id ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      <div className='flex flex-col'>
                        <span className='font-medium'>{contactType.name}</span>
                        {contactType.description && (
                          <span className='text-muted-foreground text-xs'>
                            {contactType.description}
                          </span>
                        )}
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

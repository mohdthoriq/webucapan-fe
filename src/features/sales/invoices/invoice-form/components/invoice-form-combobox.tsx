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
import { useContactsQuery } from '@/features/contacts/hooks/use-contacts-query'
import type { Contact } from '@/types'

interface InvoiceFormComboboxProps {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  companyId?: string
  limit?: number
}

export function InvoiceFormCombobox({
  value = '',
  onValueChange,
  placeholder = 'Select contact...',
  companyId,
  limit = 20,
}: InvoiceFormComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [allContacts, setAllContacts] = React.useState<Contact[]>([])
  const [selectedContact, setSelectedContact] = React.useState<Contact | null>(
    null
  )
  const [hasMore, setHasMore] = React.useState(true)

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const { data, isLoading, isError, refetch } = useContactsQuery({
    page: currentPage,
    limit,
    name: debouncedSearchTerm || undefined,
    company_id: companyId,
  })

  React.useEffect(() => {
    setCurrentPage(1)
    setAllContacts([])
    setHasMore(true)
  }, [debouncedSearchTerm, companyId])

  React.useEffect(() => {
    if (data?.data) {
      if (currentPage === 1) {
        setAllContacts(data.data)
      } else {
        setAllContacts((prev) => {
          const newContacts = data.data.filter(
            (newContact) =>
              !prev.some(
                (existingContact) => existingContact.id === newContact.id
              )
          )
          return [...prev, ...newContacts]
        })
      }

      const pagination = data.pagination
      if (pagination) {
        setHasMore(currentPage < pagination.total_pages)
      }
    }
  }, [data, currentPage])

  React.useEffect(() => {
    if (value && allContacts.length > 0) {
      const contact = allContacts.find((p) => p.id === value)
      setSelectedContact(contact || null)
    } else {
      setSelectedContact(null)
    }
  }, [value, allContacts])

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue)
  }

  const handleSelect = (contactId: string) => {
    const contact = allContacts.find((p) => p.id === contactId)
    if (contact) {
      setSelectedContact(contact)
      onValueChange?.(contactId)
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
          {selectedContact ? selectedContact.name : placeholder}
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
                    Failed to load contact
                  </span>
                  <Button variant='outline' size='sm' onClick={() => refetch()}>
                    Retry
                  </Button>
                </div>
              </CommandEmpty>
            ) : allContacts.length === 0 ? (
              <CommandEmpty>No contacts found.</CommandEmpty>
            ) : (
              <>
                <CommandGroup>
                  {allContacts.map((contact) => (
                    <CommandItem
                      key={contact.id}
                      value={contact.id}
                      onSelect={() => handleSelect(contact.id)}
                    >
                      <CheckIcon
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === contact.id ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      <div className='flex flex-col'>
                        <span className='font-medium'>{contact.name}</span>
                        {contact.company.name && (
                          <span className='text-muted-foreground text-xs'>
                            {contact.company.name}
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

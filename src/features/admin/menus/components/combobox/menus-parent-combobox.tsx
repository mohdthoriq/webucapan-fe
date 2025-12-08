'use client'

import * as React from 'react'
import type { Menu } from '@/types'
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
import { useMenusQuery } from '../../hooks/use-menus-query'

interface MenusParentComboboxProps {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  companyId?: string
  limit?: number
}

export function MenusParentCombobox({
  value = '',
  onValueChange,
  placeholder = 'Select menu...',
  companyId,
  limit = 20,
}: MenusParentComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [allMenus, setAllMenus] = React.useState<Menu[]>([])
  const [selectedMenu, setSelectedMenu] = React.useState<Menu | null>(null)
  const [hasMore, setHasMore] = React.useState(true)

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  // Query for menus with infinite scrolling
  const { data, isLoading, isError, refetch } = useMenusQuery({
    page: currentPage,
    limit,
    name: debouncedSearchTerm || undefined,
    company_id: companyId,
  })

  // Reset pagination when search term changes
  React.useEffect(() => {
    setCurrentPage(1)
    setAllMenus([])
    setHasMore(true)
  }, [debouncedSearchTerm, companyId])

  // Update menus list when new data arrives
  React.useEffect(() => {
    if (data?.data) {
      if (currentPage === 1) {
        setAllMenus(data.data)
      } else {
        setAllMenus((prev) => {
          const newMenus = data.data.filter(
            (newPerm) =>
              !prev.some((existingPerm) => existingPerm.id === newPerm.id)
          )
          return [...prev, ...newMenus]
        })
      }

      // Check if there are more pages
      const pagination = data.pagination
      if (pagination) {
        setHasMore(currentPage < pagination.total_pages)
      }
    }
  }, [data, currentPage])

  // Find selected menu when value changes
  React.useEffect(() => {
    if (value && allMenus.length > 0) {
      const menu = allMenus.find((p) => p.id === value)
      setSelectedMenu(menu || null)
    } else {
      setSelectedMenu(null)
    }
  }, [value, allMenus])

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue)
  }

  const handleSelect = (menuId: string) => {
    const menu = allMenus.find((p) => p.id === menuId)
    if (menu) {
      setSelectedMenu(menu)
      onValueChange?.(menuId)
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
          {selectedMenu ? selectedMenu.name : placeholder}
          <ChevronsUpDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full min-w-[300px] p-0'>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder='Search menus...'
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
                    Failed to load menus
                  </span>
                  <Button variant='outline' size='sm' onClick={() => refetch()}>
                    Retry
                  </Button>
                </div>
              </CommandEmpty>
            ) : allMenus.length === 0 ? (
              <CommandEmpty>No menus found.</CommandEmpty>
            ) : (
              <>
                <CommandGroup>
                  {allMenus.map((menu) => (
                    <CommandItem
                      key={menu.id}
                      value={menu.id}
                      onSelect={() => handleSelect(menu.id)}
                    >
                      <CheckIcon
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === menu.id ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      <div className='flex flex-col'>
                        <span className='font-medium'>{menu.name}</span>
                        {menu.url && (
                          <span className='text-muted-foreground text-xs'>
                            {menu.url}
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

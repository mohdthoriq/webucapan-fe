'use client'

import * as React from 'react'
import type { Permission } from '@/types'
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
import { usePermissionsQuery } from '@/features/admin/permissions/hooks/use-permissions-query'

interface MenusPermissionComboboxProps {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  companyId?: string
  limit?: number
}

export function MenusPermissionCombobox({
  value = '',
  onValueChange,
  placeholder = 'Select permission...',
  companyId,
  limit = 20,
}: MenusPermissionComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [allPermissions, setAllPermissions] = React.useState<Permission[]>([])
  const [selectedPermission, setSelectedPermission] =
    React.useState<Permission | null>(null)
  const [hasMore, setHasMore] = React.useState(true)

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  // Query for permissions with infinite scrolling
  const { data, isLoading, isError, refetch } = usePermissionsQuery({
    page: currentPage,
    limit,
    name: debouncedSearchTerm || undefined,
    company_id: companyId,
  })

  // Reset pagination when search term changes
  React.useEffect(() => {
    setCurrentPage(1)
    setAllPermissions([])
    setHasMore(true)
  }, [debouncedSearchTerm, companyId])

  // Update permissions list when new data arrives
  React.useEffect(() => {
    if (data?.data) {
      if (currentPage === 1) {
        setAllPermissions(data.data)
      } else {
        setAllPermissions((prev) => {
          const newPermissions = data.data.filter(
            (newPerm) =>
              !prev.some((existingPerm) => existingPerm.id === newPerm.id)
          )
          return [...prev, ...newPermissions]
        })
      }

      // Check if there are more pages
      const pagination = data.pagination
      if (pagination) {
        setHasMore(currentPage < pagination.total_pages)
      }
    }
  }, [data, currentPage])

  // Find selected permission when value changes
  React.useEffect(() => {
    if (value && allPermissions.length > 0) {
      const permission = allPermissions.find((p) => p.id === value)
      setSelectedPermission(permission || null)
    } else {
      setSelectedPermission(null)
    }
  }, [value, allPermissions])

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue)
  }

  const handleSelect = (permissionId: string) => {
    const permission = allPermissions.find((p) => p.id === permissionId)
    if (permission) {
      setSelectedPermission(permission)
      onValueChange?.(permissionId)
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
          {selectedPermission ? selectedPermission.name : placeholder}
          <ChevronsUpDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full min-w-[300px] p-0'>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder='Search permissions...'
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
                    Failed to load permissions
                  </span>
                  <Button variant='outline' size='sm' onClick={() => refetch()}>
                    Retry
                  </Button>
                </div>
              </CommandEmpty>
            ) : allPermissions.length === 0 ? (
              <CommandEmpty>No permissions found.</CommandEmpty>
            ) : (
              <>
                <CommandGroup>
                  {allPermissions.map((permission) => (
                    <CommandItem
                      key={permission.id}
                      value={permission.id}
                      onSelect={() => handleSelect(permission.id)}
                    >
                      <CheckIcon
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === permission.id ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      <div className='flex flex-col'>
                        <span className='font-medium'>{permission.name}</span>
                        {permission.description && (
                          <span className='text-muted-foreground text-xs'>
                            {permission.description}
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

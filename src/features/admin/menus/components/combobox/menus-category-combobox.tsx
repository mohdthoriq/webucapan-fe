'use client';

import * as React from 'react';
import type { MenuCategory } from '@/types';
import { CheckIcon, ChevronsUpDownIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/hooks/use-debounce';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useMenuCategoriesQuery } from '@/features/admin/menu-categories/hooks/use-menu-categories-query';


interface MenusCategoryComboboxProps {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  limit?: number
}

export function MenusCategoryCombobox({
  value = undefined,
  onValueChange,
  placeholder = 'Select category...',
  limit = 20,
}: MenusCategoryComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [allCategories, setAllCategories] = React.useState<MenuCategory[]>([])
  const [selectedCategory, setSelectedCategory] = React.useState<MenuCategory | null>(null)
  const [hasMore, setHasMore] = React.useState(true)

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  // Query for menu categories with infinite scrolling
  const { data, isLoading, isError, refetch } = useMenuCategoriesQuery({
    page: currentPage,
    limit,
    name: debouncedSearchTerm || undefined,
  })

  // Reset pagination when search term changes
  React.useEffect(() => {
    setCurrentPage(1)
    setAllCategories([])
    setHasMore(true)
  }, [debouncedSearchTerm])

  // Update categories list when new data arrives
  React.useEffect(() => {
    if (data?.data) {
      if (currentPage === 1) {
        setAllCategories(data.data)
      } else {
        setAllCategories((prev) => {
          const newCategories = data.data.filter(
            (newCat) =>
              !prev.some((existingCat) => existingCat.id === newCat.id)
          )
          return [...prev, ...newCategories]
        })
      }

      // Check if there are more pages
      const pagination = data.pagination
      if (pagination) {
        setHasMore(currentPage < pagination.total_pages)
      }
    }
  }, [data, currentPage])

  // Find selected category when value changes
  React.useEffect(() => {
    if (value && allCategories.length > 0) {
      const category = allCategories.find((p) => p.id === value)
      setSelectedCategory(category || null)
    } else {
      setSelectedCategory(null)
    }
  }, [value, allCategories])

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue)
  }

  const handleSelect = (categoryId: string) => {
    const category = allCategories.find((p) => p.id === categoryId)
    if (category) {
      setSelectedCategory(category)
      onValueChange?.(categoryId)
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
          {selectedCategory ? selectedCategory.name : placeholder}
          <ChevronsUpDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full min-w-[300px] p-0'>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder='Search categories...'
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
                    Failed to load categories
                  </span>
                  <Button variant='outline' size='sm' onClick={() => refetch()}>
                    Retry
                  </Button>
                </div>
              </CommandEmpty>
            ) : allCategories.length === 0 ? (
              <CommandEmpty>No categories found.</CommandEmpty>
            ) : (
              <>
                <CommandGroup>
                  {allCategories.map((category) => (
                    <CommandItem
                      key={category.id}
                      value={category.id}
                      onSelect={() => handleSelect(category.id)}
                    >
                      <CheckIcon
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === category.id ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      <div className='flex flex-col'>
                        <span className='font-medium'>{category.name}</span>
                        {category.title && (
                          <span className='text-muted-foreground text-xs'>
                            {category.title}
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

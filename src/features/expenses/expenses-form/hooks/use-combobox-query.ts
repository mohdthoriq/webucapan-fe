import * as React from 'react'
import type { UseQueryResult } from '@tanstack/react-query'
import type { PaginationApiResponse } from '@/types'
import { useDebounce } from '@/hooks/use-debounce'

interface UseComboboxQueryProps<T, P> {
  queryHook: (params: P) => UseQueryResult<PaginationApiResponse<T>, Error>
  limit?: number
}

export function useComboboxQuery<T extends { id: string }, P>({
  queryHook,
  limit = 20,
}: UseComboboxQueryProps<T, P>) {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [allItems, setAllItems] = React.useState<T[]>([])
  const [hasMore, setHasMore] = React.useState(true)

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const query = queryHook({
    page: currentPage,
    limit,
    search: debouncedSearchTerm || undefined,
  } as unknown as P)

  const { data, isLoading, isError, refetch } = query

  React.useEffect(() => {
    setCurrentPage(1)
    setAllItems([])
    setHasMore(true)
  }, [debouncedSearchTerm])

  React.useEffect(() => {
    if (data?.data) {
      if (currentPage === 1) {
        setAllItems(data.data)
      } else {
        setAllItems((prev) => {
          const newData = data.data.filter(
            (newItem: T) =>
              !prev.some((existingItem) => existingItem.id === newItem.id)
          )
          return [...prev, ...newData]
        })
      }

      const pagination = data.pagination
      if (pagination) {
        setHasMore(currentPage < pagination.total_pages)
      }
    }
  }, [data, currentPage])

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  return {
    searchTerm,
    setSearchTerm,
    allItems,
    isLoading,
    isError,
    hasMore,
    refetch,
    loadMore,
  }
}

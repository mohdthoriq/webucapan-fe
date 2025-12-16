import React, { useState } from 'react'
import type { PaginationMeta, Tag } from '@/types'
import useDialogState from '@/hooks/use-dialog-state'
import { useTagsQuery } from '../hooks/use-tags-query'

type TagsDialogType = 'view' | 'edit' | 'add' | 'delete'

type TagsContextType = {
  open: TagsDialogType | null
  setOpen: (str: TagsDialogType | null) => void
  currentRow: Tag | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Tag | null>>
  tagsData: Tag[]
  pagination: PaginationMeta
  isLoading: boolean
  isError: boolean
  paginationParams?: { page?: number; limit?: number; name?: string }
}

const TagsContext = React.createContext<TagsContextType | null>(null)

export function TagsProvider({
  children,
  paginationParams,
}: {
  children: React.ReactNode
  paginationParams?: { page?: number; limit?: number; name?: string }
}) {
  const [open, setOpen] = useDialogState<TagsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Tag | null>(null)

  const {
    data: tagsData,
    isLoading: isLoadingTags,
    isError: isErrorTags,
  } = useTagsQuery(paginationParams)

  const tagsProviderValues = {
    open,
    setOpen,
    currentRow,
    setCurrentRow,
    tagsData: tagsData?.data ?? [],
    pagination: tagsData?.pagination ?? {
      page: 1,
      limit: 10,
      total: 0,
      total_pages: 1,
    },
    isLoading: isLoadingTags,
    isError: isErrorTags,
    paginationParams,
  }

  return <TagsContext value={tagsProviderValues}>{children}</TagsContext>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTags = () => {
  const tagsContext = React.useContext(TagsContext)

  if (!tagsContext) {
    throw new Error('useTags has to be used within <TagsContext>')
  }

  return tagsContext
}

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useState,
} from 'react'
import type { Package, PaginationMeta } from '@/types'
import useDialogState from '@/hooks/use-dialog-state'
import {
  type PackagesQueryParams,
  usePackagesQuery,
} from '../hooks/use-packages-query'

type PackagesDialogType = 'view' | 'edit' | 'add' | 'delete'

type PackagesContextType = {
  open: PackagesDialogType | null
  setOpen: (str: PackagesDialogType | null) => void
  currentRow: Package | null
  setCurrentRow: Dispatch<SetStateAction<Package | null>>
  packagesData: Package[]
  pagination: PaginationMeta
  isLoading: boolean
  isError: boolean
  paginationParams?: PackagesQueryParams
}

const PackagesContext = createContext<PackagesContextType | null>(null)

export function PackagesProvider({
  children,
  paginationParams,
}: {
  children: ReactNode
  paginationParams?: PackagesQueryParams
}) {
  const [open, setOpen] = useDialogState<PackagesDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Package | null>(null)

  const {
    data: packagesData,
    isLoading: isLoadingPackages,
    isError: isErrorPackages,
  } = usePackagesQuery(paginationParams)

  const packagesProviderValues = {
    open,
    setOpen,
    currentRow,
    setCurrentRow,
    packagesData: packagesData?.data ?? [],
    pagination: packagesData?.pagination ?? {
      page: 1,
      limit: 10,
      total: 0,
      total_pages: 1,
    },
    isLoading: isLoadingPackages,
    isError: isErrorPackages,
    paginationParams,
  }

  return (
    <PackagesContext value={packagesProviderValues}>{children}</PackagesContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePackages = () => {
  const packagesContext = useContext(PackagesContext)

  if (!packagesContext) {
    throw new Error('usePackages has to be used within <PackagesContext>')
  }

  return packagesContext
}

import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { useRoleSettingsQuery } from '../hooks/useRoleSettingsQuery'
import { type Role as ApiRole } from '../types/roles-response.type'

type RolesDialogType = 'view' | 'edit' | 'add' | 'delete'

type RolesContextType = {
  open: RolesDialogType | null
  setOpen: (str: RolesDialogType | null) => void
  currentRow: ApiRole | null
  setCurrentRow: React.Dispatch<React.SetStateAction<ApiRole | null>>
  rolesData: ApiRole[]
  isLoading: boolean
  isError: boolean
  paginationParams?: { page?: number; limit?: number }
}

const RolesContext = React.createContext<RolesContextType | null>(null)

export function RolesProvider({
  children,
  paginationParams,
}: {
  children: React.ReactNode
  paginationParams?: { page?: number; limit?: number }
}) {
  const [open, setOpen] = useDialogState<RolesDialogType>(null)
  const [currentRow, setCurrentRow] = useState<ApiRole | null>(null)

  const {
    data: rolesData,
    isLoading: isLoadingRoles,
    isError: isErrorRoles,
  } = useRoleSettingsQuery(paginationParams)

  const rolesProviderValues = {
    open,
    setOpen,
    currentRow,
    setCurrentRow,
    rolesData: rolesData ?? [],
    isLoading: isLoadingRoles,
    isError: isErrorRoles,
    paginationParams,
  }

  return <RolesContext value={rolesProviderValues}>{children}</RolesContext>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useRoles = () => {
  const rolesContext = React.useContext(RolesContext)

  if (!rolesContext) {
    throw new Error('useRoles has to be used within <RolesContext>')
  }

  return rolesContext
}

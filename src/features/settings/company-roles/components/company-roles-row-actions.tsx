import { useState } from 'react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { useNavigate } from '@tanstack/react-router'
import { type Row } from '@tanstack/react-table'
import { type CompanyRole } from '@/types'
import { PERMISSION_KEY } from '@/constants/permissions'
import { useHasPermission } from '@/hooks/use-has-permission'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FeatureLockDialog } from '@/components/dialog/feature-lock.dialog'
import { useCompanyRoles } from './company-roles-provider'

type DataTableRowActionsProps = {
  row: Row<CompanyRole>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [lockFeatureDialog, setLockFeatureDialog] = useState(false)
  const hasPermission = useHasPermission(
    PERMISSION_KEY.SETTINGS_COMPANY_ROLE_DELETE
  )
  const navigate = useNavigate()
  const role = row.original
  const { setOpen, setCurrentRow } = useCompanyRoles()

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='data-[state=open]:bg-muted flex h-8 w-8 p-0'
          >
            <DotsHorizontalIcon className='h-4 w-4' />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[160px]'>
          <div className='text-muted-foreground text-center text-sm'>{`${role?.name}`}</div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(role)
              setOpen('view')
            }}
          >
            Detail
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(role)
              navigate({
                to: '/settings/company-roles/edit',
                state: { currentRowId: role.id } as Record<string, unknown>,
              })
            }}
            disabled={role?.is_default}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              if (!hasPermission) {
                setLockFeatureDialog(true)
              } else {
                setCurrentRow(role)
                setOpen('delete')
              }
            }}
            className='text-red-500!'
            disabled={role?.is_default || role?.is_deletable === false}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <FeatureLockDialog
        open={lockFeatureDialog}
        onOpenChange={setLockFeatureDialog}
        feature='Hapus Peran'
      />
    </>
  )
}

import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { type Row } from '@tanstack/react-table'
import { type CompanyRole } from '@/types'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useCompanyRoles } from './company-roles-provider'

type DataTableRowActionsProps = {
  row: Row<CompanyRole>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
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
              setOpen('edit')
            }}
            disabled={role?.is_default}
          >
            Edit
          </DropdownMenuItem>
           <DropdownMenuItem
            onClick={() => {
              setCurrentRow(role)
              setOpen('permissions')
            }}
            disabled={role?.is_default}
          >
            Manage Permissions
          </DropdownMenuItem>
            <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(role)
              setOpen('delete')
            }}
            className='text-red-500!'
            disabled={role?.is_default}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

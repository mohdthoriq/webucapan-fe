import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { type Row } from '@tanstack/react-table'
import type { Tax } from '@/types'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTaxes } from './taxes-provider'

type DataTableRowActionsProps = {
  row: Row<Tax>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const tax = row.original
  const { setOpen, setCurrentRow } = useTaxes()

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
          <div className='text-muted-foreground text-center text-sm'>{`${tax?.name}`}</div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(tax)
              setOpen('view')
            }}
          >
            Detail
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(tax)
              setOpen('edit')
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(tax)
              setOpen('delete')
            }}
            className='text-red-500!'
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

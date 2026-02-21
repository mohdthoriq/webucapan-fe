import { MoreHorizontal, Pencil, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Row } from '@tanstack/react-table'
import type { TransactionType } from '@/types'
import { useTransactionTypes } from './transaction-types-provider'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData extends TransactionType>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { setOpen, setCurrentRow } = useTransactionTypes()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'><MoreHorizontal className='h-4 w-4' /><span className='sr-only'>Open menu</span></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem onClick={() => { setCurrentRow(row.original); setOpen('edit') }}><Pencil className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={() => { setCurrentRow(row.original); setOpen('delete') }} className='text-red-600'><Trash className='mr-2 h-3.5 w-3.5' />Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

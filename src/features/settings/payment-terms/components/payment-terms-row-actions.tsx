import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { type Row } from '@tanstack/react-table'
import type { PaymentTerm } from '@/types'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePaymentTerms } from './payment-terms-provider'

type DataTableRowActionsProps = {
  row: Row<PaymentTerm>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const paymentTerms = row.original
  const { setOpen, setCurrentRow } = usePaymentTerms()

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
          <div className='text-muted-foreground text-center text-sm'>{`${paymentTerms?.name}`}</div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(paymentTerms)
              setOpen('view')
            }}
          >
            Detail
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(paymentTerms)
              setOpen('edit')
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(paymentTerms)
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

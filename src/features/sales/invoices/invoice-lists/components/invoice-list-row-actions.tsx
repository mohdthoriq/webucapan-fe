import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { useNavigate } from '@tanstack/react-router'
import { type Row } from '@tanstack/react-table'
import type { SalesInvoice } from '@/types'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type DataTableRowActionsProps = {
  row: Row<SalesInvoice>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const invoice = row.original

  const navigate = useNavigate()

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
          <div className='text-muted-foreground text-center text-sm'>{`${invoice?.invoice_number}`}</div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              navigate({
                to: `/sales/invoices/${invoice.id}`,
                search: {},
                state: { currentRowId: invoice.id } as Record<string, unknown>,
              })
            }}
          >
            Detail
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              navigate({
                to: `/sales/invoices/add`,
                search: {},
                state: { currentRowId: invoice.id } as Record<string, unknown>,
              })
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator className='mb-2'/>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

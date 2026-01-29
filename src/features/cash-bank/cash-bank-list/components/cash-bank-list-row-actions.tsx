import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { type Row } from '@tanstack/react-table'
import type { TransactionData } from '@/types'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useCashBankLists } from './cash-bank-list-provider'

type DataTableRowActionsProps = {
  row: Row<TransactionData>
}
export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const cashBank = row.original
  const navigate = useNavigate()
  const { paginationParams } = useCashBankLists()
  const search = useSearch({ strict: false }) as Record<string, unknown>

  const accountId = paginationParams?.id || (search?.id as string)

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
          <div className='text-muted-foreground text-center text-sm'>{`${cashBank?.reference}`}</div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              navigate({
                to: `/cash-bank/detail`,
                search: {
                  accountId,
                  transactionId: cashBank.id,
                },
              })
            }}
          >
            Detail
          </DropdownMenuItem>
          <DropdownMenuSeparator className='mb-2' />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

import { type ColumnDef } from '@tanstack/react-table'
import { type Account } from '@/types'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { cn, formatNumber } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { DataTableRowActions } from './account-row-actions'

export const accountsColumns: ColumnDef<Account>[] = [
  {
    accessorKey: 'code',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Kode' />
    ),
    cell: ({ row }) => {
      const { code } = row.original
      return (
        <div className='px-2'>
          <LongText className='max-w-xs truncate'>{code}</LongText>
        </div>
      )
    },
    meta: {
      className: cn(
        'w-full min-w-[150px] drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
        'ps-0.5 max-md:sticky @xl/content:table-cell @xl/content:drop-shadow-none'
      ),
    },
    enableHiding: false,
  },
  {
    accessorKey: 'Nama',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nama' />
    ),
    cell: ({ row }) => {
      const { name } = row.original
      return (
        <div
          className='flex items-center px-2'
          style={{ paddingLeft: `${row.depth * 1}rem` }}
        >
          {row.getCanExpand() ? (
            <Button
              variant='ghost'
              size='icon'
              className='h-6 w-6 p-0 hover:bg-transparent'
              onClick={row.getToggleExpandedHandler()}
            >
              {row.getIsExpanded() ? (
                <ChevronDown className='h-4 w-4' />
              ) : (
                <ChevronRight className='h-4 w-4' />
              )}
            </Button>
          ) : (
            <div className='w-6' />
          )}
          <div onClick={row.getToggleExpandedHandler()}>
            <LongText className='truncate font-medium'>{name}</LongText>
          </div>
        </div>
      )
    },
    meta: {
      className: 'w-full min-w-[150px]',
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Kategori' />
    ),
    cell: ({ row }) => {
      const { category } = row.original
      return (
        <div className='w-full min-w-48 overflow-hidden px-2'>
          <LongText className='truncate'>{category.name}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full min-w-[250px] px-12',
    },
  },
  {
    accessorKey: 'balance',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Saldo' />
    ),
    cell: ({ row }) => {
      const { balance } = row.original
      return (
        <div
          className={cn(
            'w-full min-w-48 overflow-hidden px-2',
            balance < 0 ? 'text-red-500' : 'text-blue-500'
          )}
        >
          <LongText className='truncate'>{formatNumber(balance)}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full min-w-[250px] px-12',
    },
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
    meta: { className: 'w-10' },
  },
]

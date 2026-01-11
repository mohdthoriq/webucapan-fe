import { type ColumnDef } from '@tanstack/react-table'
import { type Account } from '@/types'
import { cn, formatNumber } from '@/lib/utils'
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
          <LongText className=''>{code}</LongText>
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
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nama' />
    ),
    cell: ({ row }) => {
      const { name } = row.original
      return (
        <div className='w-full overflow-hidden px-2'>
          <LongText className='truncate'>{name}</LongText>
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

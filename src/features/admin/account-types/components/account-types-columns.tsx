import { type ColumnDef } from '@tanstack/react-table'
import { type AccountType } from '@/types'
import { cn } from '@/lib/utils'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { DataTableRowActions } from './account-types-row-actions'

export const accountTypesColumns: ColumnDef<AccountType>[] = [
  {
    accessorKey: 'code',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Kode' />
    ),
    cell: ({ row }) => {
      const { code } = row.original
      return (
        <div className='px-2'>
          <LongText className='min-w-36'>{code}</LongText>
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
      <DataTableColumnHeader column={column} title='Tipe Akun' />
    ),
    cell: ({ row }) => {
      const { name } = row.original
      return (
        <div className='w-full min-w-48 overflow-hidden px-2'>
          <LongText className='truncate'>{name}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full min-w-[150px] px-8',
    },
  },
  {
    accessorKey: 'normal_balance',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Saldo Normal' />
    ),
    cell: ({ row }) => {
      const { normal_balance } = row.original
      return (
        <div className='w-full min-w-48 overflow-hidden px-2'>
          <LongText className='truncate'>{normal_balance}</LongText>
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

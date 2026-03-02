import { type ColumnDef } from '@tanstack/react-table'
import type { TransactionType } from '@/types'
import { cn } from '@/lib/utils'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'


export const transactionTypesColumns: ColumnDef<TransactionType>[] = [
  {
    accessorKey: 'code',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Kode' />
    ),
    cell: ({ row }) => {
      const { code } = row.original
      return (
        <div className='px-2'>
          <LongText>{code}</LongText>
        </div>
      )
    },
    meta: {
      className: cn(
        'w-40 drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
        'ps-0.5 max-sm:sticky @4xl/content:table-cell @4xl/content:drop-shadow-none'
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
        <div className='px-2'>
          <LongText>{name}</LongText>
        </div>
      )
    },
    meta: {
      className: cn(
        'w-full min-w-[250px] drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
        'ps-0.5 max-sm:sticky @4xl/content:table-cell @4xl/content:drop-shadow-none'
      ),
    },
    enableHiding: false,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Deskripsi' />
    ),
    cell: ({ row }) => {
      const { description } = row.original
      return (
        <div className='overflow-hidden px-2'>
          <LongText
            className='max-w-xs truncate'
            contentClassName='w-xs text-sm'
          >
            {description}
          </LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full min-w-[300px]',
    },
  },
]

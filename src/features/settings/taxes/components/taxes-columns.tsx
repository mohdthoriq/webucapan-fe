import { type ColumnDef } from '@tanstack/react-table'
import { type Tax } from '@/types'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { DataTableRowActions } from './taxes-row-actions'

export const taxesColumns: ColumnDef<Tax>[] = [
  {
    accessorKey: 'Nama',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nama Pajak' />
    ),
    cell: ({ row }) => {
      const { name } = row.original
      return (
        <div className='p-2'>
          <LongText className='min-w-36'>{name}</LongText>
        </div>
      )
    },
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
        'ps-0.5 max-md:sticky @4xl/content:table-cell @4xl/content:drop-shadow-none'
      ),
    },
    enableHiding: false,
  },
  {
    accessorKey: 'Persentase',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Persentase' />
    ),
    cell: ({ row }) => {
      const { rate } = row.original
      return (
        <div className='p-2'>
          <LongText className='truncate'>{rate}%</LongText>
        </div>
      )
    },
    meta: {
      className: 'min-w-32',
    },
  },
  {
    accessorKey: 'Deskripsi',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Deskripsi' />
    ),
    cell: ({ row }) => {
      const { description } = row.original
      return (
        <div className='p-2'>
          <LongText className='line-clamp-1'>{description || '-'}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full min-w-64',
    },
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
    meta: { className: 'w-10' },
  },
]

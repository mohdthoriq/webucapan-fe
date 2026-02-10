import { type ColumnDef } from '@tanstack/react-table'
import { type Package } from '@/types'
import { cn } from '@/lib/utils'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { DataTableRowActions } from './packages-row-actions'

export const packagesColumns: ColumnDef<Package>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nama Paket' />
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
        'w-full drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
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
          <LongText className='truncate'>{description}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full',
    },
  },
  {
    accessorKey: 'monthly_price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Harga Bulanan' />
    ),
    cell: ({ row }) => {
      const { monthly_price } = row.original
      return (
        <div className='overflow-hidden px-2'>
          <LongText className='truncate'>{monthly_price}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full',
    },
  },
  {
    accessorKey: 'yearly_price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Harga Tahunan' />
    ),
    cell: ({ row }) => {
      const { yearly_price } = row.original
      return (
        <div className='overflow-hidden px-2'>
          <LongText className='truncate'>{yearly_price}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full',
    },
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
    meta: { className: 'w-10' },
  },
]

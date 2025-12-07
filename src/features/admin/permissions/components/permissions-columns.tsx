import { type ColumnDef } from '@tanstack/react-table'
import { type Permission } from '@/types'
import { cn } from '@/lib/utils'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { DataTableRowActions } from './permissions-row-actions'

export const permissionsColumns: ColumnDef<Permission>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nama Permission' />
    ),
    cell: ({ row }) => {
      const { name } = row.original
      return <div className='px-2'>{name}</div>
    },
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
        'px-8 ps-2 max-md:sticky @4xl/content:table-cell @4xl/content:drop-shadow-none'
      ),
    },
    enableHiding: false,
  },
  {
    accessorKey: 'parent',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Parent' />
    ),
    cell: ({ row }) => {
      const { parent } = row.original
      return (
        <div className='overflow-hidden px-2'>
          <LongText className='truncate'>{parent?.name}</LongText>
        </div>
      )
    },
    meta: {
      className: 'px-8',
    },
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
      className: 'w-full px-8',
    },
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
    meta: { className: 'w-10' },
  },
]

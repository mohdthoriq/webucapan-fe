import { type ColumnDef } from '@tanstack/react-table'
import { type CompanyRole } from '@/types'
import { cn } from '@/lib/utils'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { DataTableRowActions } from './company-roles-row-actions'

export const rolesColumns: ColumnDef<CompanyRole>[] = [
  {
    accessorKey: 'Nama',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nama Peran' />
    ),
    cell: ({ row }) => {
      const { name } = row.original
      return (
        <div className='px-2'>
          <LongText className=''>{name}</LongText>
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
    accessorKey: 'Deskripsi',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Deskripsi' />
    ),
    cell: ({ row }) => {
      const { description } = row.original
      return (
        <div className='w-full overflow-hidden px-2'>
          <LongText className='truncate'>{description}</LongText>
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

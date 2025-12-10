import { type ColumnDef } from '@tanstack/react-table';
import { type AccountCategory } from '@/types';
import { cn } from '@/lib/utils';
import { DataTableColumnHeader } from '@/components/data-table';
import { LongText } from '@/components/long-text';
import { DataTableRowActions } from './account-categories-row-actions';


export const accountCategoriesColumns: ColumnDef<AccountCategory>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nama' />
    ),
    cell: ({ row }) => {
      const { name } = row.original
      return (
        <div className='px-4'>
          <LongText>{name}</LongText>
        </div>
      )
    },
    meta: {
      className: cn(
        'w-full min-w-[250px] drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
        'px-8 max-sm:sticky @4xl/content:table-cell @4xl/content:drop-shadow-none'
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
        <div className='w-full min-w-48 overflow-hidden px-2'>
          <LongText className='truncate'>{description}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full min-w-[150px] px-8',
    },
  },
  {
    accessorKey: 'type_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tipe Akun' />
    ),
    cell: ({ row }) => {
      const { type_id } = row.original
      return (
        <div className='w-full min-w-48 overflow-hidden px-2'>
          <LongText className='truncate'>{type_id.name}</LongText>
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
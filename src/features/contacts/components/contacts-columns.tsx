import { type ColumnDef } from '@tanstack/react-table';
import { type Contact } from '@/types';
import { cn } from '@/lib/utils';
import { DataTableColumnHeader } from '@/components/data-table';
import { LongText } from '@/components/long-text';
import { DataTableRowActions } from './contacts-row-actions';


export const contactsColumns: ColumnDef<Contact>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nama' />
    ),
    cell: ({ row }) => {
      const { name } = row.original
      return (
        <div className='px-4'>
          <LongText className='min-w-sm'>{name}</LongText>
        </div>
      )
    },
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
        'px-8 max-md:sticky @4xl/content:table-cell @4xl/content:drop-shadow-none'
      ),
    },
    enableHiding: false,
  },
  {
    accessorKey: 'contact_type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tipe Kontak' />
    ),
    cell: ({ row }) => {
      const { contact_type } = row.original
      return (
        <div className='w-full min-w-48 overflow-hidden px-2'>
          <LongText className='truncate'>{contact_type}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full min-w-[250px] px-12',
    },
  },
  {
    accessorKey: 'company_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Perusahaan' />
    ),
    cell: ({ row }) => {
      const { company_name } = row.original
      return (
        <div className='w-full min-w-48 overflow-hidden px-2'>
          <LongText className='truncate'>{company_name}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full min-w-[250px] px-12',
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => {
      const { email } = row.original
      return (
        <div className='w-full min-w-48 overflow-hidden px-2'>
          <LongText className='truncate'>{email}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full min-w-[250px] px-12',
    },
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Telepon' />
    ),
    cell: ({ row }) => {
      const { phone } = row.original
      return (
        <div className='w-full min-w-48 overflow-hidden px-2'>
          <LongText className='truncate'>{phone}</LongText>
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
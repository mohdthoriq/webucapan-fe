import { type ColumnDef } from '@tanstack/react-table';
import { type Subscription } from '@/types';
import { cn, formatDate } from '@/lib/utils';
import { DataTableColumnHeader } from '@/components/data-table';
import { LongText } from '@/components/long-text';
import { DataTableRowActions } from './subscriptions-row-actions';


export const subscriptionsColumns: ColumnDef<Subscription>[] = [
  {
    accessorKey: 'company',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Perusahaan' />
    ),
    cell: ({ row }) => {
      const { company } = row.original
      return (
        <div className='px-2'>
          <LongText>{company?.name}</LongText>
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
    accessorKey: 'plan_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Plan' />
    ),
    cell: ({ row }) => {
      const { plan_name } = row.original
      return (
        <div className='overflow-hidden px-2'>
          <LongText className='truncate'>{plan_name}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full',
    },
  },
  {
    accessorKey: 'start_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tanggal Mulai' />
    ),
    cell: ({ row }) => {
      const { start_date } = row.original
      const formattedDate = formatDate(start_date)
      return (
        <div className='overflow-hidden px-2'>
          <LongText className='truncate'>{formattedDate}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full',
    },
  },
  {
    accessorKey: 'end_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tanggal Berakhir' />
    ),
    cell: ({ row }) => {
      const { end_date } = row.original
      const formattedDate = end_date ? formatDate(end_date) : '-'
      return (
        <div className='overflow-hidden px-2'>
          <LongText className='truncate'>{formattedDate}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full',
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const { Subscriptions_status } = row.original
      return (
        <div className='overflow-hidden px-2'>
          <LongText className='truncate'>{Subscriptions_status}</LongText>
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
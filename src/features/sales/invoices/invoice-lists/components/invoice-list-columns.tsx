import { format } from 'date-fns'
import { type ColumnDef } from '@tanstack/react-table'
import type { SalesInvoice } from '@/types'
import { cn } from '@/lib/utils'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { DataTableRowActions } from './invoice-list-row-actions'

export const invoiceListsColumns: ColumnDef<SalesInvoice>[] = [
  {
    accessorKey: 'invoice_number',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='No. Invoice' />
    ),
    cell: ({ row }) => {
      const { invoice_number } = row.original
      return (
        <div className='px-2'>
          <LongText>{invoice_number}</LongText>
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
    accessorKey: 'customer',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Pelanggan' />
    ),
    cell: ({ row }) => {
      const { customer } = row.original
      return (
        <div className='px-2'>
          <LongText>{customer.name}</LongText>
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
    accessorKey: 'invoice_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tanggal Invoice' />
    ),
    cell: ({ row }) => {
      const { invoice_date } = row.original
      const formattedDate = format(invoice_date, 'dd/MM/yyyy')
      return (
        <div className='px-2'>
          <LongText className='truncate'>{formattedDate}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full min-w-[150px]',
    },
  },
  {
    accessorKey: 'due_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tanggal Jatuh Tempo' />
    ),
    cell: ({ row }) => {
      const { due_date } = row.original
      const formattedDate = format(due_date, 'dd/MM/yyyy')
      return (
        <div className='px-2'>
          <LongText className='truncate'>{formattedDate}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full min-w-[150px]',
    },
  },
  {
    accessorKey: 'total',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Total' />
    ),
    cell: ({ row }) => {
      const { total } = row.original
      return (
        <div className='px-2'>
          <LongText className='truncate'>{total}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full min-w-[150px]',
    },
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
    meta: { className: 'w-10' },
  },
]

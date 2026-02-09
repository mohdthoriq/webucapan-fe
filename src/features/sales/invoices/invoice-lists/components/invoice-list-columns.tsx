import { format } from 'date-fns'
import { Link } from '@tanstack/react-router'
import { type ColumnDef } from '@tanstack/react-table'
import type { SalesInvoice } from '@/types'
import { cn, formatNumber, getStatusStyles, invoiceLabel } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
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
      const { invoice_number, id } = row.original
      return (
        <div className='px-2'>
          <Link
            to='/sales/invoices/detail'
            state={{ currentRowId: id } as Record<string, unknown>}
          >
            <LongText className='text-primary cursor-pointer hover:underline'>
              {invoice_number}
            </LongText>
          </Link>
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
        <div className='w-full overflow-hidden px-2'>
          <LongText className='truncate'>{customer.name}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full',
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
      className: 'w-full',
    },
  },
  {
    accessorKey: 'due_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Jatuh Tempo' />
    ),
    cell: ({ row }) => {
      const { due_date } = row.original
      const formattedDate = due_date ? format(due_date, 'dd/MM/yyyy') : '-'
      return (
        <div className='px-2'>
          <LongText className='truncate'>{formattedDate}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full',
    },
  },
  {
    accessorKey: 'payment_status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const { payment_status } = row.original
      return (
        <div className='px-2'>
          <Badge className={cn(getStatusStyles(payment_status))}>
            {invoiceLabel[payment_status] || payment_status}
          </Badge>
        </div>
      )
    },
    meta: {
      className: 'w-full',
    },
  },
  {
    accessorKey: 'outstanding',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Sisa Tagihan' />
    ),
    cell: ({ row }) => {
      const { outstanding } = row.original
      const formattedOutstanding = formatNumber(outstanding)
      return (
        <div className='px-2'>
          <LongText className='truncate'>{formattedOutstanding}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full',
    },
  },
  {
    accessorKey: 'total',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Total' />
    ),
    cell: ({ row }) => {
      const { total } = row.original
      const formattedTotal = formatNumber(total)
      return (
        <div className='px-2'>
          <LongText className='truncate'>{formattedTotal}</LongText>
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

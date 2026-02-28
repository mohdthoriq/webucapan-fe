import { format } from 'date-fns'
import { Link } from '@tanstack/react-router'
import { type ColumnDef } from '@tanstack/react-table'
import type { Expense } from '@/types'
import { cn, formatNumber, getStatusStyles, invoiceLabel } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'

export const expensesListsColumns: ColumnDef<Expense>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px] border-[#a8a8a8] dark:border-[#5c5c5c]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        onClick={(e) => e.stopPropagation()}
        aria-label='Select row'
        className='translate-y-[2px] border-[#a8a8a8] dark:border-[#5c5c5c]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
    meta: {
      className: 'w-4 p-2 z-9000',
    },
  },
  {
    accessorKey: 'Nomor',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nomor' />
    ),
    cell: ({ row }) => {
      const { expense_number, id } = row.original
      return (
        <div className='p-2'>
          <Link
            to='/expenses/detail'
            state={{ currentRowId: id } as Record<string, unknown>}
          >
            <LongText className='text-primary cursor-pointer hover:underline'>
              {expense_number}
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
    accessorKey: 'Penerima',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Penerima' />
    ),
    cell: ({ row }) => {
      const { contact } = row.original
      return (
        <div className='w-full overflow-hidden p-2'>
          <LongText className='truncate'>{contact.name}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full',
    },
    enableHiding: false,
  },
  {
    accessorKey: 'Tanggal',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tanggal Expense' />
    ),
    cell: ({ row }) => {
      const { date } = row.original
      const formattedDate = format(date, 'dd/MM/yyyy')
      return (
        <div className='p-2'>
          <LongText className='truncate'>{formattedDate}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full',
    },
  },
  {
    accessorKey: 'Jatuh Tempo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Jatuh Tempo' />
    ),
    cell: ({ row }) => {
      const { due_date } = row.original
      const formattedDate = format(due_date as Date, 'dd/MM/yyyy')
      return (
        <div className='p-2'>
          <LongText className='truncate'>{formattedDate}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full',
    },
  },
  {
    accessorKey: 'Status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const { payment_status } = row.original
      return (
        <div className='p-2'>
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
    accessorKey: 'Sisa Tagihan',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Sisa Tagihan' />
    ),
    cell: ({ row }) => {
      const { outstanding } = row.original
      const formattedOutstanding = formatNumber(outstanding)
      return (
        <div className='p-2'>
          <LongText className='truncate'>{formattedOutstanding}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full',
    },
  },
  {
    accessorKey: 'Total',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Total' />
    ),
    cell: ({ row }) => {
      const { total } = row.original
      const formattedTotal = formatNumber(total)
      return (
        <div className='p-2'>
          <LongText className='truncate'>{formattedTotal}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full',
    },
  },
]

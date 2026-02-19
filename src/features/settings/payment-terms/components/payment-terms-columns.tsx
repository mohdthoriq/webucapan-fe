import { type ColumnDef } from '@tanstack/react-table'
import { type PaymentTerm } from '@/types'
import { cn } from '@/lib/utils'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { DataTableRowActions } from './payment-terms-row-actions'

export const paymentTermsColumns: ColumnDef<PaymentTerm>[] = [
  {
    accessorKey: 'Nama',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nama Termin Pembayaran' />
    ),
    cell: ({ row }) => {
      const { name } = row.original
      return (
        <div className='px-2'>
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
    accessorKey: 'Lama',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Lama' />
    ),
    cell: ({ row }) => {
      const { days } = row.original
      return (
        <div className='w-full min-w-48 overflow-hidden px-2'>
          <LongText className='truncate'>{days}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full min-w-[700px]',
    },
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
    meta: { className: 'w-10' },
  },
]

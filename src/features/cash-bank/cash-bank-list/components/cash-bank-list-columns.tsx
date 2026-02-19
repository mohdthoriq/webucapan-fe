import { format } from 'date-fns'
import { type ColumnDef } from '@tanstack/react-table'
import type { TransactionData } from '@/types'
import { cn, formatNumber } from '@/lib/utils'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { NavigationCell } from './cash-bank-list-nomor-cell'

export const cashBankListsColumns: ColumnDef<TransactionData>[] = [
  {
    accessorKey: 'Tanggal',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tanggal' />
    ),
    cell: ({ row }) => {
      const { date } = row.original
      const formattedDate = format(new Date(date), 'dd/MM/yyyy')
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
    accessorKey: 'Nomor',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nomor' />
    ),
    cell: ({ row }) => <NavigationCell row={row} name={'ref_number'} />,
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
    cell: ({ row }) => <NavigationCell row={row} name={'description'} />,
    meta: {
      className: 'w-full ',
    },
  },
  {
    accessorKey: 'Referensi',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Referensi' />
    ),
    cell: ({ row }) => {
      const { reference } = row.original
      return (
        <div className='w-full overflow-hidden p-2'>
          <LongText className='truncate'>{reference || '-'}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full',
    },
  },
  {
    accessorKey: 'Terima',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Terima' />
    ),
    cell: ({ row }) => {
      const { received } = row.original
      const formattedReceived = formatNumber(received)
      return (
        <div className='p-2'>
          <LongText className='truncate'>{formattedReceived}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full',
    },
  },
  {
    accessorKey: 'Keluar',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Keluar' />
    ),
    cell: ({ row }) => {
      const { spent } = row.original
      const formattedSpent = formatNumber(spent)
      return (
        <div className='p-2'>
          <LongText className='truncate'>{formattedSpent}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full',
    },
  },
  {
    accessorKey: 'Saldo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Saldo' />
    ),
    cell: ({ row }) => {
      const { balance } = row.original
      const formattedBalance = formatNumber(balance)
      return (
        <div className='p-2'>
          <LongText className='truncate'>{formattedBalance}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full',
    },
  },
  // {
  //   accessorKey: 'Status',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Status' />
  //   ),
  //   cell: ({ row }) => {
  //     const { status } = row.original
  //     return (
  //       <div className='p-2'>
  //         <Badge className={cn(getStatusStyles(status))}>{status}</Badge>
  //       </div>
  //     )
  //   },
  //   meta: {
  //     className: 'w-full',
  //   },
  // },
]

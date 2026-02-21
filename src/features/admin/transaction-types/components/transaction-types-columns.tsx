import type { ColumnDef } from '@tanstack/react-table'
import type { TransactionType } from '@/types'
import { DataTableRowActions } from './transaction-types-row-actions'

export const columns: ColumnDef<TransactionType>[] = [
  {
    accessorKey: 'code',
    header: 'Kode',
  },
  {
    accessorKey: 'name',
    header: 'Nama',
  },
  {
    accessorKey: 'description',
    header: 'Deskripsi',
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]

import type { ColumnDef } from '@tanstack/react-table'
import { formatCurrency } from '@/lib/utils'
import type { CategorySalesReportItem } from '@/types/domain/sales-per-categories'

export const salesPerCategoryColumns: ColumnDef<CategorySalesReportItem>[] = [
  {
    accessorKey: 'category_name',
    header: 'Nama Kategori',
    cell: ({ row }) => (
      <div className='font-medium'>{row.getValue('category_name')}</div>
    ),
  },
  {
    accessorKey: 'quantity_sold',
    header: 'Kuantitas Terjual',
    cell: ({ row }) => (
      <div className='text-right'>{row.getValue('quantity_sold')}</div>
    ),
    meta: {
      className: 'text-right',
    },
  },
  {
    accessorKey: 'total_sales',
    header: 'Total Penjualan',
    cell: ({ row }) => (
      <div className='text-right'>
        {formatCurrency(row.getValue('total_sales'))}
      </div>
    ),
    meta: {
      className: 'text-right',
    },
  },
]

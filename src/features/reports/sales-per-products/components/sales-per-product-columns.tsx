import type { ColumnDef } from '@tanstack/react-table'
import { formatCurrency } from '@/lib/utils'
import type { ProductSalesReportItem } from '@/types/domain/sales-per-products'

export const salesPerProductColumns: ColumnDef<ProductSalesReportItem>[] = [
  {
    accessorKey: 'product_code',
    header: 'SKU',
  },
  {
    accessorKey: 'product_name',
    header: 'Nama Produk',
    cell: ({ row }) => (
      <div className='font-medium'>{row.getValue('product_name')}</div>
    ),
  },
  {
    accessorKey: 'category_name',
    header: 'Kategori',
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
  {
    accessorKey: 'total_cost',
    header: 'Total Modal',
    cell: ({ row }) => (
      <div className='text-right'>
        {formatCurrency(row.getValue('total_cost'))}
      </div>
    ),
    meta: {
      className: 'text-right',
    },
  },
  {
    accessorKey: 'gross_profit',
    header: 'Laba Kotor',
    cell: ({ row }) => (
      <div className='text-right font-medium'>
        {formatCurrency(row.getValue('gross_profit'))}
      </div>
    ),
    meta: {
      className: 'text-right',
    },
  },
]

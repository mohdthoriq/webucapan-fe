import { type ColumnDef } from '@tanstack/react-table';
import { type Product } from '@/types';
import { cn } from '@/lib/utils';
import { DataTableColumnHeader } from '@/components/data-table';
import { LongText } from '@/components/long-text';
import { DataTableRowActions } from './products-row-actions';


export const productsColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'sku',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='SKU' />
    ),
    cell: ({ row }) => {
      const { sku } = row.original
      return (
        <div className='px-4'>
          <LongText>{sku}</LongText>
        </div>
      )
    },
    meta: {
      className: cn(
        'w-full min-w-[150px] drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
        'px-8 max-sm:sticky @4xl/content:table-cell @4xl/content:drop-shadow-none'
      ),
    },
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nama' />
    ),
    cell: ({ row }) => {
      const { name } = row.original
      return (
        <div className='w-full min-w-48 overflow-hidden px-2'>
          <LongText className='truncate'>{name}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full min-w-[150px] px-8',
    },
  },
  {
    accessorKey: 'unit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Satuan' />
    ),
    cell: ({ row }) => {
      const { unit } = row.original
      return (
        <div className='w-full min-w-48 overflow-hidden px-2'>
          <LongText className='truncate'>{unit.name}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full min-w-[150px] px-8',
    },
  },
  {
    accessorKey: 'product_category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Kategori' />
    ),
    cell: ({ row }) => {
      const { product_category } = row.original
      return (
        <div className='w-full min-w-48 overflow-hidden px-2'>
          <LongText className='truncate'>{product_category.name}</LongText>
        </div>
      )
    },
    meta: {
      className: 'w-full min-w-[150px] px-8',
    },
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
    meta: { className: 'w-10' },
  },
]
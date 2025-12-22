import { Fragment, useMemo } from 'react'
import { type useForm } from 'react-hook-form'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useProductsQuery } from '@/features/products/product-list/hooks/use-product-list-query'
import { useTaxesQuery } from '@/features/settings/taxes/hooks/use-taxes-query'
import type {
  CreateInvoiceFormData,
  InvoiceItemFormData,
  UpdateInvoiceFormData,
} from '../types/invoice-form.schema'
import { InvoiceItemRow } from './invoice-item-row'

type InvoiceItemsTableProps = {
  fields: InvoiceItemFormData[]
  form: ReturnType<
    typeof useForm<CreateInvoiceFormData | UpdateInvoiceFormData>
  >
  remove: (index: number) => void
}

export function InvoiceItemsTable({
  fields,
  form,
  remove,
}: InvoiceItemsTableProps) {
  const { data: products } = useProductsQuery({ page: 1, limit: 100 })
  const { data: taxes } = useTaxesQuery({ page: 1, limit: 100 })

  const productsData = useMemo(
    () => ({ data: products?.data || [] }),
    [products?.data]
  )
  const taxesData = useMemo(() => ({ data: taxes?.data || [] }), [taxes?.data])

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[200px]'>Produk</TableHead>
            <TableHead className='w-[200px]'>Deskripsi</TableHead>
            <TableHead className='w-[100px]'>Qty</TableHead>
            <TableHead className='w-[100px]'>Harga</TableHead>
            <TableHead className='w-[100px]'>Disc</TableHead>
            <TableHead className='w-[100px]'>Pajak</TableHead>
            <TableHead className='w-[100px] text-right'>Total</TableHead>
            <TableHead className='w-[50px]'></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field, index) => (
            <Fragment key={`${field.product_id}-${index}`}>
              <InvoiceItemRow
                index={index}
                form={form}
                remove={remove}
                products={productsData}
                taxes={taxesData}
              />
            </Fragment>
          ))}
          {fields.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={8}
                className='text-muted-foreground h-24 text-center'
              >
                Belum ada item. Tambahkan item baru.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

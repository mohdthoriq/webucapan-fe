import type { useForm } from 'react-hook-form'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
  UpdateInvoiceFormData,
} from '../types/invoice-form.schema'
import type { InvoiceItem } from '../types/invoice-item.types'

type InvoiceItemsTableProps = {
  fields: InvoiceItem[] & { id: string }[]
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

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[200px]'>Produk</TableHead>
            <TableHead className='w-[250px]'>Deskripsi</TableHead>
            <TableHead className='w-[100px]'>Qty</TableHead>
            <TableHead className='w-[150px]'>Harga</TableHead>
            <TableHead className='w-[100px]'>Disc</TableHead>
            <TableHead className='w-[150px]'>Pajak</TableHead>
            <TableHead className='w-[150px] text-right'>Total</TableHead>
            <TableHead className='w-[50px]'></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field, index) => (
            <TableRow key={field.id}>
              <TableCell>
                <FormField
                  control={form.control}
                  name={`invoice_items.${index}.product_id`}
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={(val) => {
                          field.onChange(val)
                          const prod = products?.data.find((p) => p.id === val)
                          if (prod) {
                            form.setValue(
                              `invoice_items.${index}.description`,
                              prod.description || prod.name
                            )
                            form.setValue(
                              `invoice_items.${index}.unit_price`,
                              prod.sale_price || 0
                            )
                          }
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Pilih Produk' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {products?.data.map((p) => (
                            <SelectItem key={p.id} value={p.id}>
                              {p.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </TableCell>
              <TableCell>
                <FormField
                  control={form.control}
                  name={`invoice_items.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TableCell>
              <TableCell>
                <FormField
                  control={form.control}
                  name={`invoice_items.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type='number'
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TableCell>
              <TableCell>
                <FormField
                  control={form.control}
                  name={`invoice_items.${index}.unit_price`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type='number'
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TableCell>
              <TableCell>
                <FormField
                  control={form.control}
                  name={`invoice_items.${index}.discount`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type='number'
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TableCell>
              <TableCell>
                <FormField
                  control={form.control}
                  name={`invoice_items.${index}.tax_id`}
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Pajak' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {taxes?.data.map((t) => (
                            <SelectItem key={t.id} value={t.id}>
                              {t.name} ({t.rate}%)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </TableCell>
              <TableCell className='text-right font-medium'>
                {(
                  (form.watch(`invoice_items.${index}.quantity`) || 0) *
                    (form.watch(`invoice_items.${index}.unit_price`) || 0) -
                  (form.watch(`invoice_items.${index}.discount`) || 0)
                ).toLocaleString()}
              </TableCell>
              <TableCell>
                <Button
                  type='button'
                  variant='ghost'
                  size='icon'
                  className='text-destructive'
                  onClick={() => remove(index)}
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </TableCell>
            </TableRow>
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

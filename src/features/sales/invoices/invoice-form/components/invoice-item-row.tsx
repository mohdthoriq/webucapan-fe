import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TableCell, TableRow } from "@/components/ui/table"
import type { Product, Tax } from "@/types"
import { Trash2 } from "lucide-react"
import type { useForm } from "react-hook-form"
import type { InvoiceItem } from "../types/invoice-item.types"
import type { CreateInvoiceFormData, UpdateInvoiceFormData } from "../types/invoice-form.schema"

export function InvoiceItemRow({
  field,
  index,
  form,
  remove,
  products,
  taxes,
}: {
  field: InvoiceItem
  index: number
  form: ReturnType<
    typeof useForm<CreateInvoiceFormData | UpdateInvoiceFormData>
  >
  remove: (index: number) => void
  products: { data: Product[] }
  taxes: { data: Tax[] }
}) {
  return (
    <TableRow key={field.product_id}>
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
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
  )
}

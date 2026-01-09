import { useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InvoiceItemsTable } from '../components/invoice-items-table'
import type { CreateInvoiceFormData } from '../types/invoice-form.schema'

export function InvoiceFormItems() {
  const [itemsAmount, setItemsAmount] = useState(1)

  const form = useFormContext<CreateInvoiceFormData>()
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'sales_invoice_items',
  })

  const handleAddItems = () => {
    const amount = itemsAmount > 0 ? itemsAmount : 1
    const newItems = Array.from({ length: amount }).map(() => ({
      product_id: '',
      description: '',
      quantity: 1,
      unit_price: 0,
      tax_id: '',
      discount: undefined,
      line_total: 0,
    }))
    append(newItems)
  }

  return (
    <div className='flex flex-col space-y-4'>
      <h3 className='text-lg font-medium'>Item Invoice</h3>

      <InvoiceItemsTable fields={fields} remove={remove} form={form} />

      <div className='flex items-center gap-4'>
        <Button
          type='button'
          variant='outline'
          size='sm'
          onClick={handleAddItems}
        >
          <Plus className='mr-2 h-4 w-4' /> Tambah{' '}
          {itemsAmount > 1 ? `${itemsAmount} Item` : 'Item'}
        </Button>
        <Input
          type='number'
          min={1}
          max={100}
          value={itemsAmount}
          onChange={(e) => setItemsAmount(e.target.valueAsNumber)}
          className='w-16 text-sm'
        />
        <Badge
          variant={'outline'}
          className='text-muted-foreground bg-secondary text-sm'
        >
          Total: {fields.length}
        </Badge>
      </div>
    </div>
  )
}

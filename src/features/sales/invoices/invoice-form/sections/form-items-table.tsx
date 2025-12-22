import { Plus } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { InvoiceItemsTable } from '../components/invoice-items-table'
import type { CreateInvoiceFormData } from '../types/invoice-form.schema'

export function InvoiceFormItems() {
  const form = useFormContext<CreateInvoiceFormData>()
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'invoice_items',
  })

  return (
    <div className='flex flex-col space-y-4'>
      <h3 className='text-lg font-medium'>Item Invoice</h3>
      
      <InvoiceItemsTable 
        fields={fields} 
        remove={remove} 
        form={form} 
      />

      <div className='space-y-2'>
        <Button
          type='button'
          variant='outline'
          size='sm'
          onClick={() =>
            append({
              product_id: '',
              description: '',
              quantity: 1,
              unit_price: 0,
              tax_id: '',
              discount: undefined,
              line_total: 0,
            })
          }
        >
          <Plus className='mr-2 h-4 w-4' /> Tambah Item
        </Button>
      </div>
    </div>
  )
}

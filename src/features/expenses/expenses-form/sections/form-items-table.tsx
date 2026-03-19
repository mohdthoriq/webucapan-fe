import { useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ExpensesItemsTable } from '../components/expenses-items-table'
import type { CreateExpenseFormData } from '../types/expenses-form.schema'

export function ExpensesFormItems() {
  const [itemsAmount, setItemsAmount] = useState(1)

  const form = useFormContext<CreateExpenseFormData>()
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'expense_items',
  })

  const handleAddItems = () => {
    const amount = itemsAmount > 0 ? itemsAmount : 1
    const newItems = Array.from({ length: amount }).map(() => ({
      account_id: '',
      description: '',
      tax_id: '',
      tax_amount: 0,
      amount: 0,
    }))
    append(newItems)
  }

  return (
    <div className='flex flex-col space-y-3'>
      <div className='flex items-center justify-between'>
        <h3 className='text-md font-medium'>Item Biaya</h3>
        <Badge
          variant={'outline'}
          className='text-muted-foreground bg-secondary h-6 text-xs'
        >
          Total: {fields.length}
        </Badge>
      </div>

      <ExpensesItemsTable fields={fields} remove={remove} form={form} />

      <div className='flex items-center gap-4'>
        <Button
          type='button'
          variant='outline'
          size='sm'
          className='h-8'
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
          className='h-8 w-16 text-sm'
        />
      </div>
    </div>
  )
}

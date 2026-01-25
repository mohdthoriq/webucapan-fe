import { useTaxesQuery } from '@/features/settings/taxes/hooks/use-taxes-query'
import { useExpensesTotals } from '../hooks/use-expenses-totals'

export function ExpensesFormSummary() {
  const { data: taxes } = useTaxesQuery({ page: 1, limit: 100 })
  const totals = useExpensesTotals(taxes?.data || [])

  return (
    <div className='flex justify-end'>
      <div className='w-full space-y-2 md:w-1/3'>
        <div className='flex justify-between'>
          <span className='text-muted-foreground'>Sub Total</span>
          <span>{totals.subtotal.toLocaleString()}</span>
        </div>
        <div className='flex flex-col gap-2 border-b pb-2'>
          {Object.entries(totals.taxBreakdown).map(([name, amount]) => (
            <div key={name} className='text-md flex justify-between'>
              <span className='text-muted-foreground'>{name}</span>
              <span>{amount.toLocaleString()}</span>
            </div>
          ))}
          {Object.keys(totals.taxBreakdown).length === 0 && (
            <div className='text-md flex justify-between'>
              <span className='text-muted-foreground'>Total Pajak</span>
              <span>{totals.taxTotal.toLocaleString()}</span>
            </div>
          )}
        </div>
        <div className='flex justify-between text-lg font-bold'>
          <span>Total</span>
          <span>{totals.total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

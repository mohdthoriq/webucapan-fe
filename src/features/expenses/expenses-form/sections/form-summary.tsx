import { useTaxesQuery } from '@/features/settings/taxes/hooks/use-taxes-query'
import { useExpensesTotals } from '../hooks/use-expenses-totals'

export function ExpensesFormSummary() {
  const { data: taxes } = useTaxesQuery({ page: 1, limit: 100 })
  const totals = useExpensesTotals(taxes?.data || [])

  return (
    <div className='flex justify-end'>
      <div className='w-full space-y-1.5 md:w-1/3'>
        <div className='border-muted-foreground/10 flex justify-between border-b pb-1 text-sm'>
          <span className='text-muted-foreground'>Subtotal</span>
          <span className='font-medium'>{totals.subtotal.toLocaleString()}</span>
        </div>
        <div className='flex flex-col gap-1 border-b pb-1.5 border-muted-foreground/10'>
          {Object.entries(totals.taxBreakdown).map(([name, amount]) => (
            <div key={name} className='flex justify-between text-sm'>
              <span className='text-muted-foreground'>{name}</span>
              <span className='font-medium'>{amount.toLocaleString()}</span>
            </div>
          ))}
          {Object.keys(totals.taxBreakdown).length === 0 && (
            <div className='flex justify-between text-sm'>
              <span className='text-muted-foreground'>Total Pajak</span>
              <span className='font-medium'>{totals.taxTotal.toLocaleString()}</span>
            </div>
          )}
        </div>
        <div className='flex items-center justify-between pt-1'>
          <span className='font-bold text-sm'>Total</span>
          <span className='text-primary text-lg font-black'>
            {totals.total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}

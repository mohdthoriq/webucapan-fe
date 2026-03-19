import { useTaxesQuery } from '@/features/settings/taxes/hooks/use-taxes-query'
import { useInvoiceTotals } from '../hooks/use-invoice-totals'

export function InvoiceFormSummary() {
  const { data: taxes } = useTaxesQuery({ page: 1, limit: 100 })
  const totals = useInvoiceTotals(taxes?.data || [])

  return (
    <div className='flex justify-end'>
      <div className='w-full space-y-1.5 md:w-1/3'>
        <div className='flex justify-between text-sm'>
          <span className='text-muted-foreground'>Sub Total</span>
          <span>{totals.subtotal.toLocaleString()}</span>
        </div>
        <div className='flex flex-col gap-1 border-b pb-1.5'>
          {Object.entries(totals.taxBreakdown).map(([name, amount]) => (
            <div key={name} className='flex justify-between text-sm'>
              <span className='text-muted-foreground'>{name}</span>
              <span>{amount.toLocaleString()}</span>
            </div>
          ))}
          {Object.keys(totals.taxBreakdown).length === 0 && (
            <div className='flex justify-between text-sm'>
              <span className='text-muted-foreground'>Total Pajak</span>
              <span>{totals.taxTotal.toLocaleString()}</span>
            </div>
          )}
        </div>
        <div className='flex justify-between text-md font-bold'>
          <span>Total</span>
          <span>{totals.total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

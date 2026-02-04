import { Button } from '@/components/ui/button'
import { BillsOverview } from './components/bills-overview'
import { CashOverview } from './components/cash-overview'
import { ExpenseOverview } from './components/expense-overview'
import { SalesDashboardOverview } from './components/sales-overview'
import { Printer } from 'lucide-react'

export function Dashboard() {
  return (
    <>
      <div className='mb-10 flex items-center justify-between space-y-2'>
        <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            className='gap-2 shadow-sm'
            onClick={() => window.print()}
          >
            <Printer className='h-4 w-4' /> Cetak
          </Button>
        </div>
      </div>
      <div className='grid gap-x-4 gap-y-6 sm:grid-cols-1 lg:grid-cols-2'>
        <CashOverview />
        <BillsOverview />
        <SalesDashboardOverview />
        <ExpenseOverview />
      </div>
    </>
  )
}

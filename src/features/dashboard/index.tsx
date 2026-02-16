import { useRef, useState } from 'react'
import { Loader2, Printer } from 'lucide-react'
import { useReactToPrint } from 'react-to-print'
import { Button } from '@/components/ui/button'
import { BillsOverview } from './components/bills-overview'
import { CashOverview } from './components/cash-overview'
import { ExpenseOverview } from './components/expense-overview'
import { DashboardPrint } from './components/print/dashboard-print'
import { SalesDashboardOverview } from './components/sales-overview'

export function Dashboard() {
  const [isPrinting, setIsPrinting] = useState(false)
  const printRef = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    onBeforePrint: async () => {
      setIsPrinting(true)
      return new Promise((resolve) => {
        setTimeout(resolve, 2000)
      })
    },
    onAfterPrint: () => {
      setIsPrinting(false)
    },
  })

  return (
    <>
      <div>
        <div className='mb-10 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              className='gap-2 shadow-sm'
              onClick={() => handlePrint()}
              disabled={isPrinting}
            >
              {isPrinting ? (
                <Loader2 className='h-4 w-4 animate-spin' />
              ) : (
                <Printer className='h-4 w-4' />
              )}{' '}
              {isPrinting ? 'Memproses...' : 'Cetak'}
            </Button>
          </div>
        </div>
        <div className='grid gap-x-4 gap-y-6 sm:grid-cols-1 lg:grid-cols-2'>
          <CashOverview />
          <BillsOverview />
          <SalesDashboardOverview />
          <ExpenseOverview />
        </div>
      </div>
      <div
        className={
          isPrinting
            ? 'absolute top-0 left-0 z-[-1] m-0 w-[210mm] min-w-[210mm] p-0'
            : 'hidden'
        }
      >
        <DashboardPrint ref={printRef} />
      </div>
    </>
  )
}

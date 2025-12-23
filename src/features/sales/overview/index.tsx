import { Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TotalSales } from './components/total-sales'
import { PaymentsReceived } from './components/payments-received'

export function SalesOverview() {
  return (
    <>
      <div className='flex w-full flex-col items-center justify-between space-y-8'>
        <div className='flex w-full items-center justify-between'>
          <h1 className='text-2xl font-bold'>Sales Overview</h1>
          <Button
            variant='outline'
            className='gap-2 shadow-sm'
            onClick={() => window.print()}
          >
            <Printer className='h-4 w-4' /> Cetak
          </Button>
        </div>
        <div className='flex w-full items-center justify-end'>
          <Tabs defaultValue='month'>
            <TabsList className='h-10 w-[200px]'>
              <TabsTrigger value='month'>Bulan</TabsTrigger>
              <TabsTrigger value='year'>Tahun</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          <TotalSales />
          <PaymentsReceived />
        </div>
      </div>
    </>
  )
}

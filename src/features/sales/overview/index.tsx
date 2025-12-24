import { useState } from 'react'
import { Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CustomerSalesCard } from './components/customer-sales-card'
import { Overdue } from './components/overdue'
import { PaidRatioCard } from './components/paid-ratio-card'
import { PaymentChartCard } from './components/payment-chart-card'
import { PaymentsReceived } from './components/payments-received'
import { ProductSalesCard } from './components/product-sales-card'
import { TotalSales } from './components/total-sales'
import { WaitingPayments } from './components/waiting-payments'

export function SalesOverview() {
  const [period, setPeriod] = useState<'month' | 'year'>('month')

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
          <Tabs
            defaultValue='month'
            onValueChange={(v) => setPeriod(v as 'month' | 'year')}
          >
            <TabsList className='h-10 w-[200px]'>
              <TabsTrigger value='month'>Bulan</TabsTrigger>
              <TabsTrigger value='year'>Tahun</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          <div className='grid w-full grid-cols-1 gap-4 md:col-span-2 md:grid-cols-2'>
            <TotalSales globalPeriod={period} />
            <PaymentsReceived globalPeriod={period} />
            <WaitingPayments globalPeriod={period} />
            <Overdue globalPeriod={period} />
            <PaymentChartCard
              className='col-span-1 md:col-span-2'
              globalPeriod={period}
            />
          </div>
          <div className='flex flex-col gap-4'>
            <PaidRatioCard className='h-auto' globalPeriod={period} />
            <ProductSalesCard className='h-auto' globalPeriod={period} />
            <CustomerSalesCard className='h-auto' globalPeriod={period} />
          </div>
        </div>
      </div>
    </>
  )
}

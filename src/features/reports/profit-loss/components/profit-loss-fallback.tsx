import { format } from 'date-fns'
import { ArrowLeft, CalendarIcon, Printer } from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { UpgradePlanCard } from '@/components/upgrade-plan-card'
import { ReportSectionSkeleton } from '../../balance-sheet/components/report-section-skeleton'
import {
  ProfitLossProvider,
  useProfitLossContext,
} from './profit-loss-provider'
import { ReportSectionView } from './report-section-view'

export function ProfitLossFallback() {
  return (
    <ProfitLossProvider defaultDateFrom={new Date()} defaultDateTo={new Date()}>
      <ProfitLossPageContent />
    </ProfitLossProvider>
  )
}

function ProfitLossPageContent() {
  const { dateFrom, dateTo, data, isLoading } = useProfitLossContext()

  return (
    <div className='relative'>
      <div className='pointer-events-none flex flex-col gap-10 opacity-100 blur-[2px]'>
        {/* Header - Screen Only */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-semibold tracking-tight'>Laba Rugi</h1>
          </div>
          <div className='flex items-center gap-3'>
            <Button variant='outline'>
              <Printer className='h-4 w-4' />
              {'Cetak'}
            </Button>
            <Button variant={'outline'} onClick={() => history.back()}>
              <ArrowLeft className='h-4 w-4' />
              Kembali
            </Button>
          </div>
        </div>

        <div className='flex items-center justify-end gap-2'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-[280px] justify-between border-slate-200 p-3 text-left font-normal transition-colors hover:border-slate-400 hover:bg-slate-50/50'
                )}
              >
                <div className='flex items-center gap-2'>
                  <span>{format(dateFrom, 'dd/MM/yyyy')}</span>
                  <span className='text-muted-foreground'>→</span>
                  <span>{format(dateTo, 'dd/MM/yyyy')}</span>
                </div>
                <CalendarIcon className='h-4 w-4 text-slate-400' />
              </Button>
            </PopoverTrigger>
          </Popover>
        </div>

        {/* Report Content */}
        <Card className='rounded-md border-none p-0'>
          <CardContent className='p-0'>
            {isLoading ? (
              <div className='flex flex-col gap-10'>
                <ReportSectionSkeleton />
                <ReportSectionSkeleton />
                <ReportSectionSkeleton />
              </div>
            ) : data ? (
              <div className='flex flex-col gap-8'>
                <ReportSectionView
                  title='Pendapatan'
                  section={data.revenue}
                  totalLabel='Total Pendapatan'
                  date={dateTo}
                />
                <ReportSectionView
                  title='Beban Pokok Penjualan'
                  section={data.cogs}
                  totalLabel='Total Beban Pokok Penjualan'
                  date={dateTo}
                />

                <div className='border-y border-slate-200 bg-slate-100/20 p-5'>
                  <div className='flex items-center justify-between text-xl font-bold uppercase'>
                    <span>Laba Kotor</span>
                    <span>
                      {data.gross_profit.total < 0
                        ? `(${formatCurrency(Math.abs(data.gross_profit.total))})`
                        : formatCurrency(data.gross_profit.total)}
                    </span>
                  </div>
                </div>

                <ReportSectionView
                  title='Biaya Operasional'
                  section={data.operating_expenses}
                  totalLabel='Total Biaya Operasional'
                  date={dateTo}
                />

                <div className='border-y p-5 shadow-sm'>
                  <div className='flex items-center justify-between text-2xl font-bold uppercase'>
                    <span>Laba Bersih</span>
                    <span>
                      {data.net_income.total < 0
                        ? `(${formatCurrency(Math.abs(data.net_income.total))})`
                        : formatCurrency(data.net_income.total)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className='text-muted-foreground flex h-96 flex-col items-center justify-center space-y-4'>
                <div className='rounded-full bg-slate-200 p-4'>
                  <CalendarIcon className='h-10 w-10 text-slate-400' />
                </div>
                <p className='text-lg font-medium'>Tidak ada data ditemukan</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <UpgradePlanCard feature='Laba Rugi' />
    </div>
  )
}

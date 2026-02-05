import { useState } from 'react'
import { format } from 'date-fns'
import type {
  BalanceSheetReport,
} from '@/types/domain/balance-sheet'
import { id } from 'date-fns/locale'
import { CalendarIcon, Loader2, Printer } from 'lucide-react'
import { useAuthStore } from '@/stores/auth-store'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ReportSectionView } from './components/report-section-view'
import { useBalanceSheetReportQuery } from './hooks/use-balance-sheet-report-query'

export default function BalanceSheetPage() {
  const [date, setDate] = useState<Date>(new Date())
  const { auth } = useAuthStore()
  const company = auth.user?.company

  const { data: rawData, isLoading } = useBalanceSheetReportQuery({ date })
  const reportDate = format(date, 'yyyy-MM-dd')
  const data = rawData?.[reportDate] as BalanceSheetReport | undefined

  const handlePrint = () => {
    if (rawData?.print_url) {
      window.open(rawData.print_url as string, '_blank')
    } else {
      window.print()
    }
  }

  return (
    <div className='flex flex-col space-y-6 pb-10'>
      {/* Header - Screen Only */}
      <div className='flex items-center justify-between print:hidden'>
        <div>
          <h1 className='text-4xl font-semibold tracking-tight'>Neraca</h1>
        </div>
        <div className='flex items-center gap-3'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-[240px] justify-start border-blue-200 text-left font-normal transition-colors hover:border-blue-400 hover:bg-blue-50/50',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className='h-4 w-4' />
                {date ? (
                  format(date, 'd MMMM yyyy', { locale: id })
                ) : (
                  <span>Pilih tanggal</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='end'>
              <Calendar
                mode='single'
                selected={date}
                onSelect={(d) => d && setDate(d)}
                autoFocus
              />
            </PopoverContent>
          </Popover>
          <Button variant='outline' onClick={handlePrint}>
            <Printer className='h-4 w-4' />
            Cetak
          </Button>
        </div>
      </div>

      {/* Report Content */}
      <Card className='rounded-md border-none p-0'>
        <CardContent className='p-0'>
          <div className='mb-6 hidden flex-col items-center justify-center space-y-2 border-b p-8 print:flex'>
            {company?.logo_url && (
              <img
                src={company.logo_url}
                alt={company.name}
                className='mb-2 h-16 w-auto'
              />
            )}
            <h2 className='text-2xl font-bold uppercase'>
              {company?.name || 'Perusahaan'}
            </h2>
            <h3 className='text-xl font-semibold text-gray-700'>
              Laporan Neraca
            </h3>
            <p className='text-sm text-gray-500'>
              Per {format(date, 'd MMMM yyyy', { locale: id })}
            </p>
          </div>

          {isLoading ? (
            <div className='flex h-96 items-center justify-center'>
              <div className='flex flex-col items-center gap-4'>
                <Loader2 className='h-10 w-10 animate-spin text-blue-500' />
                <p className='text-muted-foreground animate-pulse'>
                  Memuat data laporan...
                </p>
              </div>
            </div>
          ) : data ? (
            <div className='flex flex-col gap-6'>
              {/* Assets Section */}
              <div>
                <ReportSectionView
                  title='Aset'
                  date={date}
                  section={data.assets}
                  totalLabel='Total Assets'
                />
              </div>

              {/* Liabilities and Equity Section */}
              <div>
                <ReportSectionView
                  title='Liabilitas and Modal'
                  date={date}
                  section={data.liabilities_equity}
                  totalLabel='Total Liabilitas and Modal'
                />
              </div>
            </div>
          ) : (
            <div className='text-muted-foreground flex h-96 flex-col items-center justify-center space-y-4'>
              <div className='rounded-full bg-slate-100 p-4'>
                <CalendarIcon className='h-10 w-10 text-slate-400' />
              </div>
              <p className='text-lg font-medium'>Tidak ada data ditemukan</p>
              <p className='max-w-xs text-center text-sm'>
                Silakan pilih tanggal lain atau pastikan transaksi sudah dicatat
                untuk periode ini.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Footer - Screen Only */}
      {!isLoading && data && (
        <div className='text-muted-foreground text-center text-xs print:hidden'>
          Dicetak pada {format(new Date(), 'dd/MM/yyyy HH:mm:ss')}
        </div>
      )}
    </div>
  )
}

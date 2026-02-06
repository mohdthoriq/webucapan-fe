import { format, parse } from 'date-fns'
import { getRouteApi } from '@tanstack/react-router'
import { id } from 'date-fns/locale'
import { ArrowLeft, CalendarIcon, Loader2, Printer } from 'lucide-react'
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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BalanceSheetAccountDetailDialog } from './components/balance-sheet-account-detail-dialog'
import { BalanceSheetOverview } from './components/balance-sheet-overview'
import {
  BalanceSheetProvider,
  useBalanceSheetContext,
} from './components/balance-sheet-provider'
import { ReportSectionView } from './components/report-section-view'

const route = getRouteApi('/_authenticated/reports/balance-sheet/')

function BalanceSheetPageContent() {
  const { auth } = useAuthStore()
  const { date, setDate, data: rawData, isLoading } = useBalanceSheetContext()
  const company = auth.user?.company
  const navigate = route.useNavigate()

  const reportDate = format(date, 'yyyy-MM-dd')
  const data = rawData?.[reportDate]

  const handleSelectDate = (d: Date) => {
    setDate(d)
    navigate({
      search: (prev: Record<string, unknown>) => ({
        ...prev,
        date: format(d, 'yyyy-MM-dd'),
      }),
      replace: true,
    })
  }

  return (
    <div className='flex flex-col gap-10'>
      <div className='flex items-center justify-end gap-3'>
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
              onSelect={handleSelectDate}
              required
              autoFocus
            />
          </PopoverContent>
        </Popover>
      </div>

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
          ) : data && typeof data !== 'string' ? (
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
      <BalanceSheetAccountDetailDialog />
    </div>
  )
}

export default function BalanceSheetPage() {
  const search = route.useSearch() as { date?: string }
  const defaultDate = search.date
    ? parse(search.date, 'yyyy-MM-dd', new Date())
    : new Date()

  return (
    <div className='flex flex-col gap-10'>
      <div className='flex items-center justify-between print:hidden'>
        <div>
          <h1 className='text-4xl font-semibold tracking-tight'>Neraca</h1>
        </div>
        <div className='flex items-center gap-3'>
          <Button variant='outline' onClick={() => window.print()}>
            <Printer className='h-4 w-4' />
            Cetak
          </Button>
          <Button variant={'ghost'} onClick={() => history.back()}>
            <ArrowLeft className='h-4 w-4' />
            Kembali
          </Button>
        </div>
      </div>

      <div className='flex items-center justify-end gap-3'>
        <Tabs defaultValue='monthly'>
          <TabsList className='h-10'>
            <TabsTrigger value='monthly'>Bulanan</TabsTrigger>
            <TabsTrigger value='yearly'>Tahunan</TabsTrigger>
          </TabsList>
        </Tabs>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-[240px] justify-start border-blue-200 text-left font-normal transition-colors hover:border-blue-400 hover:bg-blue-50/50',
                !defaultDate && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className='h-4 w-4' />
              {defaultDate ? (
                format(defaultDate, 'd MMMM yyyy', { locale: id })
              ) : (
                <span>Pilih tanggal</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='end'>
            <Calendar mode='single' />
          </PopoverContent>
        </Popover>
      </div>

      {/* Report Content */}
      <BalanceSheetOverview date={defaultDate} />

      <BalanceSheetProvider defaultDate={defaultDate}>
        <BalanceSheetPageContent />
      </BalanceSheetProvider>
    </div>
  )
}

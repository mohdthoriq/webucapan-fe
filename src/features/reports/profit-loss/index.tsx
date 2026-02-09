import { format, parse, startOfMonth, endOfMonth } from 'date-fns'
import { getRouteApi } from '@tanstack/react-router'
import { id } from 'date-fns/locale'
import { CalendarIcon, Printer, ArrowLeft } from 'lucide-react'
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
import { ProfitLossAccountDetailDialog } from './components/profit-loss-account-detail-dialog'
// import { ProfitLossOverview } from './components/profit-loss-overview' // Placeholder if not implemented yet
import {
  ProfitLossProvider,
  useProfitLossContext,
} from './components/profit-loss-provider'
import { ReportSectionView } from './components/report-section-view'

const route = getRouteApi('/_authenticated/reports/profit-loss/')

function ProfitLossPageContent() {
  const { auth } = useAuthStore()
  const { dateFrom, dateTo, setDateRange, data, isLoading } =
    useProfitLossContext()
  const company = auth.user?.company
  const navigate = route.useNavigate()

  const handleSelectDateFrom = (d: Date) => {
    setDateRange(d, dateTo)
    navigate({
      search: (prev: Record<string, unknown>) => ({
        ...prev,
        date_from: format(d, 'yyyy-MM-dd'),
      }),
      replace: true,
    })
  }

  const handleSelectDateTo = (d: Date) => {
    setDateRange(dateFrom, d)
    navigate({
      search: (prev: Record<string, unknown>) => ({
        ...prev,
        date_to: format(d, 'yyyy-MM-dd'),
      }),
      replace: true,
    })
  }

  const handlePrint = () => {
    if (data?.print_url) {
      window.open(data.print_url, '_blank')
    } else {
      window.print()
    }
  }

  return (
    <div className='flex flex-col gap-10'>
      {/* Header - Screen Only */}
      <div className='flex items-center justify-between print:hidden'>
        <div>
          <h1 className='text-3xl font-semibold tracking-tight'>Laba Rugi</h1>
        </div>
        <div className='flex items-center gap-3'>
          <Button variant='outline' onClick={handlePrint}>
            <Printer className='h-4 w-4' />
            Cetak
          </Button>
          <Button variant={'link'} onClick={() => history.back()}>
            <ArrowLeft className='h-4 w-4' />
            Kembali
          </Button>
        </div>
      </div>

      <div className='flex items-center justify-end gap-3 print:hidden'>
        <Tabs defaultValue='monthly'>
          <TabsList className='h-10'>
            <TabsTrigger value='monthly'>Bulanan</TabsTrigger>
            <TabsTrigger value='yearly'>Tahunan</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className='flex items-center gap-2'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-[200px] justify-start border-blue-200 text-left font-normal transition-colors hover:border-blue-400 hover:bg-blue-50/50'
                )}
              >
                <CalendarIcon className='h-4 w-4 text-blue-500' />
                {format(dateFrom, 'd MMMM yyyy', { locale: id })}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='end'>
              <Calendar
                mode='single'
                selected={dateFrom}
                onSelect={(d) => d && handleSelectDateFrom(d)}
                required
                autoFocus
              />
            </PopoverContent>
          </Popover>
          <span className='text-muted-foreground'>s/d</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-[200px] justify-start border-blue-200 text-left font-normal transition-colors hover:border-blue-400 hover:bg-blue-50/50'
                )}
              >
                <CalendarIcon className='h-4 w-4 text-blue-500' />
                {format(dateTo, 'd MMMM yyyy', { locale: id })}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='end'>
              <Calendar
                mode='single'
                selected={dateTo}
                onSelect={(d) => d && handleSelectDateTo(d)}
                required
                autoFocus
              />
            </PopoverContent>
          </Popover>
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
              Laporan Laba Rugi
            </h3>
            <p className='text-sm text-gray-500'>
              Periode {format(dateFrom, 'd MMMM yyyy', { locale: id })} -{' '}
              {format(dateTo, 'd MMMM yyyy', { locale: id })}
            </p>
          </div>

          {isLoading ? (
            <div className='flex h-96 items-center justify-center'>
              <div className='flex flex-col items-center gap-4'>
                <div className='border-primary h-10 w-10 animate-spin rounded-full border-2 border-t-transparent' />
                <p className='text-muted-foreground animate-pulse'>
                  Memuat data laporan...
                </p>
              </div>
            </div>
          ) : data ? (
            <div className='flex flex-col gap-8'>
              <ReportSectionView
                title='Pendapatan'
                section={data.revenue}
                totalLabel='Total Pendapatan'
              />
              <ReportSectionView
                title='Harga Pokok Penjualan'
                section={data.cogs}
                totalLabel='Total Harga Pokok Penjualan'
              />

              <div className='border-y border-blue-100 bg-blue-50/50 p-5'>
                <div className='flex items-center justify-between text-xl font-bold uppercase'>
                  <span>Laba Kotor</span>
                  <span>
                    {data.gross_profit.total.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    })}
                  </span>
                </div>
              </div>

              <ReportSectionView
                title='Beban Operasional'
                section={data.operating_expenses}
                totalLabel='Total Beban Operasional'
              />

              <div className='bg-primary/10 border-primary/20 border-y p-5 shadow-sm'>
                <div className='flex items-center justify-between text-2xl font-bold uppercase'>
                  <span>Laba Bersih</span>
                  <span
                    className={
                      data.net_income.total >= 0
                        ? 'text-green-600'
                        : 'text-red-600'
                    }
                  >
                    {data.net_income.total.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    })}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className='text-muted-foreground flex h-96 flex-col items-center justify-center space-y-4'>
              <div className='rounded-full bg-slate-100 p-4'>
                <CalendarIcon className='h-10 w-10 text-slate-400' />
              </div>
              <p className='text-lg font-medium'>Tidak ada data ditemukan</p>
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
      <ProfitLossAccountDetailDialog />
    </div>
  )
}

export default function ProfitLossPage() {
  const search = route.useSearch() as { date_from?: string; date_to?: string }
  const defaultDateFrom = search.date_from
    ? parse(search.date_from, 'yyyy-MM-dd', new Date())
    : startOfMonth(new Date())
  const defaultDateTo = search.date_to
    ? parse(search.date_to, 'yyyy-MM-dd', new Date())
    : endOfMonth(new Date())

  return (
    <ProfitLossProvider
      defaultDateFrom={defaultDateFrom}
      defaultDateTo={defaultDateTo}
    >
      <ProfitLossPageContent />
    </ProfitLossProvider>
  )
}

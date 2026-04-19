import { parse, startOfMonth, endOfMonth, format } from 'date-fns'
import { getRouteApi } from '@tanstack/react-router'
import { ArrowLeft, CalendarIcon } from 'lucide-react'
import type { DateRange } from 'react-day-picker'
import { cn } from '@/lib/utils'
import { PERMISSION_KEY } from '@/constants/permissions'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { PermissionGuard } from '@/components/permission-guard'
import {
  SalesPerProductProvider,
  useSalesPerProduct,
} from './components/sales-per-product-provider'
import { SalesPerProductTable } from './components/sales-per-product-table'
import { type SalesPerProductQueryParams } from './hooks/use-sales-per-product-query'

// import { SalesPerProductFallback } from './components/sales-per-product-fallback'

const route = getRouteApi('/_authenticated/reports/sales-per-product/')

function SalesPerProductContent() {
  const search = route.useSearch() as Record<string, string>
  const navigate = route.useNavigate()
  const { date_from, date_to, setDateRange } = useSalesPerProduct()

  const handleSelectRange = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      setDateRange(range.from, range.to)
      navigate({
        search: (prev: Record<string, unknown>) => ({
          ...prev,
          date_from: format(range.from!, 'yyyy-MM-dd'),
          date_to: format(range.to!, 'yyyy-MM-dd'),
        }),
        replace: true,
      })
    }
  }

  return (
    <PermissionGuard
      permission={PERMISSION_KEY.REPORTS_SALES_PRODUCT}
      // fallback={<SalesPerProductFallback search={search} navigate={navigate} />}
    >
      <Card>
        <CardHeader>
          <div className='flex justify-between'>
            <div className='mb-2 grid'>
              <h2 className='text-2xl font-bold tracking-tight'>
                Laporan Penjualan per Produk
              </h2>
              <p className='text-muted-foreground'>
                Laporan Penjualan per Produk di Perusahaan Anda.
              </p>
            </div>
            <div className='flex items-center gap-2'>
              {/* <Button
                variant={'outline'}
                // onClick={() => handlePrint()}
                // disabled={isPrinting || isLoading || !data}
              >
                {isPrinting ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                  <Printer className='h-4 w-4' />
                )}
                {isPrinting ? 'Memproses...' : 'Cetak'}
              </Button> */}
              <Button
                variant={'outline'}
                onClick={() => navigate({ to: '/reports' })}
              >
                <ArrowLeft className='h-4 w-4' />
                Kembali
              </Button>
            </div>
          </div>
          <hr />
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
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
                    <span>{format(date_from, 'dd/MM/yyyy')}</span>
                    <span className='text-muted-foreground'>→</span>
                    <span>{format(date_to, 'dd/MM/yyyy')}</span>
                  </div>
                  <CalendarIcon className='h-4 w-4 text-slate-400' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='end'>
                <Calendar
                  mode='range'
                  selected={{ from: date_from, to: date_to }}
                  onSelect={handleSelectRange}
                  required
                  autoFocus
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
          <SalesPerProductTable search={search} navigate={navigate} />
        </CardContent>
      </Card>
    </PermissionGuard>
  )
}

export default function SalesPerProductPage() {
  const search = route.useSearch() as Record<string, string>

  const paginationParams: SalesPerProductQueryParams = {
    page: search.page ? parseInt(search.page) : 1,
    limit: search.limit ? parseInt(search.limit) : 10,
    date_from: search.date_from
      ? parse(search.date_from, 'yyyy-MM-dd', new Date())
      : startOfMonth(new Date()),
    date_to: search.date_to
      ? parse(search.date_to, 'yyyy-MM-dd', new Date())
      : endOfMonth(new Date()),
    product_category_id: search.product_category_id,
    search: search.search,
  }

  return (
    <SalesPerProductProvider paginationParams={paginationParams}>
      <SalesPerProductContent />
    </SalesPerProductProvider>
  )
}

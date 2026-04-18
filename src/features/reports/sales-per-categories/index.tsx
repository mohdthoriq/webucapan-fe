import { useState, useMemo } from 'react'
import { format, parse, startOfMonth, endOfMonth } from 'date-fns'
import { getRouteApi } from '@tanstack/react-router'
import { CalendarIcon, Search, ArrowLeft, Printer } from 'lucide-react'
import type { DateRange } from 'react-day-picker'
import { cn } from '@/lib/utils'
import { PERMISSION_KEY } from '@/constants/permissions'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { PermissionGuard } from '@/components/permission-guard'
import { SalesPerCategoryTable } from './components/sales-per-category-table'
import { useSalesPerCategoryQuery } from './hooks/use-sales-per-category-query'

const route = getRouteApi('/_authenticated/reports/sales-per-categories/')

export default function SalesPerCategoryPage() {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  const dateFrom = useMemo(
    () =>
      search.date_from
        ? parse(search.date_from, 'yyyy-MM-dd', new Date())
        : startOfMonth(new Date()),
    [search.date_from]
  )
  const dateTo = useMemo(
    () =>
      search.date_to
        ? parse(search.date_to, 'yyyy-MM-dd', new Date())
        : endOfMonth(new Date()),
    [search.date_to]
  )

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: dateFrom,
    to: dateTo,
  })

  const { data, isLoading } = useSalesPerCategoryQuery({
    date_from: format(dateFrom, 'yyyy-MM-dd'),
    date_to: format(dateTo, 'yyyy-MM-dd'),
    search: search.search,
    page: search.page,
    limit: search.limit,
  })

  const handleSelectRange = (range: DateRange | undefined) => {
    setDateRange(range)
    if (range?.from && range?.to) {
      navigate({
        search: (prev) => ({
          ...prev,
          date_from: format(range.from!, 'yyyy-MM-dd'),
          date_to: format(range.to!, 'yyyy-MM-dd'),
        }),
      })
    }
  }

  const handleSearchChange = (val: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        search: val || undefined,
        page: 1,
      }),
    })
  }

  return (
    <PermissionGuard permission={PERMISSION_KEY.REPORTS_SALES_CATEGORY_VIEW}>
      <div className='flex flex-col gap-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-semibold tracking-tight'>
              Penjualan per Kategori Produk
            </h1>
          </div>
          <div className='flex items-center gap-3'>
            <Button variant='outline' onClick={() => window.print()}>
              <Printer className='h-4 w-4' />
              Cetak
            </Button>
            <Button
              variant='outline'
              onClick={() => navigate({ to: '/reports' })}
            >
              <ArrowLeft className='h-4 w-4' />
              Kembali
            </Button>
          </div>
        </div>

        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div className='flex flex-wrap items-center gap-2'>
            <div className='relative w-[280px]'>
              <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
              <Input
                placeholder='Cari kategori...'
                className='pl-9'
                value={search.search ?? ''}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className={cn(
                  'w-[280px] justify-between border-slate-200 p-3 text-left font-normal transition-colors hover:border-slate-400'
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
            <PopoverContent className='w-auto p-0' align='end'>
              <Calendar
                mode='range'
                selected={dateRange}
                onSelect={handleSelectRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        <Card>
          <CardContent className='p-6'>
            <SalesPerCategoryTable
              data={data?.items ?? []}
              isLoading={isLoading}
              pagination={{
                pageIndex: search.page ?? 1,
                pageSize: search.limit ?? 10,
                pageCount: data?.pagination?.total_pages ?? 1,
                onPaginationChange: (paginationState) => {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      page: paginationState.pageIndex,
                      limit: paginationState.pageSize,
                    }),
                  })
                },
              }}
            />
          </CardContent>
        </Card>
      </div>
    </PermissionGuard>
  )
}

import { useState } from 'react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { MoreVertical, Calendar as CalendarIcon } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useTotalPaymentsQuery } from '../hooks/use-total-payments-query'

type Period = 'day' | 'week' | 'month' | 'year' | 'custom'

const periodLabels: Record<Period, string> = {
  day: 'Harian',
  week: 'Mingguan',
  month: 'Bulanan',
  year: 'Tahunan',
  custom: 'Custom',
}

interface PaymentChartCardProps {
  className?: string
}

export function PaymentChartCard({ className }: PaymentChartCardProps) {
  const [period, setPeriod] = useState<Period>('month')
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()
  const [isCustomDateOpen, setIsCustomDateOpen] = useState(false)

  const queryParams =
    period === 'custom' && dateFrom && dateTo
      ? {
          date_from: format(dateFrom, 'yyyy-MM-dd'),
          date_to: format(dateTo, 'yyyy-MM-dd'),
          period: 'month' as const,
        }
      : {
          date_from: '',
          date_to: '',
          period: period === 'custom' ? 'month' : period,
        }

  const { data, isLoading } = useTotalPaymentsQuery(queryParams)

  const handlePeriodChange = (newPeriod: Period) => {
    setPeriod(newPeriod)
    if (newPeriod !== 'custom') {
      setDateFrom(undefined)
      setDateTo(undefined)
    } else {
      setIsCustomDateOpen(true)
    }
  }

  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(0)}jt`
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}rb`
    }
    return value.toString()
  }

  const formatTooltipValue = (value: number) => {
    return new Intl.NumberFormat('id-ID').format(value)
  }

  return (
    <Card className={cn('bg-card border-border', className)}>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-4'>
        <h3 className='text-sm font-semibold tracking-wide uppercase'>
          Pembayaran Diterima
        </h3>
        <div className='flex items-center gap-2'>
          {period === 'custom' && dateFrom && dateTo && (
            <Popover open={isCustomDateOpen} onOpenChange={setIsCustomDateOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  size='sm'
                  className='h-8 gap-2 text-xs'
                >
                  <CalendarIcon className='h-3 w-3' />
                  {format(dateFrom, 'dd/MM/yy', { locale: id })} -{' '}
                  {format(dateTo, 'dd/MM/yy', { locale: id })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='end'>
                <div className='flex gap-2 p-3'>
                  <div className='space-y-2'>
                    <p className='text-muted-foreground text-xs font-medium'>
                      Dari
                    </p>
                    <Calendar
                      mode='single'
                      selected={dateFrom}
                      onSelect={setDateFrom}
                      locale={id}
                    />
                  </div>
                  <div className='space-y-2'>
                    <p className='text-muted-foreground text-xs font-medium'>
                      Sampai
                    </p>
                    <Calendar
                      mode='single'
                      selected={dateTo}
                      onSelect={setDateTo}
                      locale={id}
                      disabled={(date) => (dateFrom ? date < dateFrom : false)}
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='text-muted-foreground hover:text-foreground h-8 w-8'
              >
                <MoreVertical className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-40'>
              <div className='text-muted-foreground px-2 py-1.5 text-xs font-semibold'>
                Filter Periode
              </div>
              <DropdownMenuSeparator />
              {(Object.keys(periodLabels) as Period[]).map((p) => (
                <DropdownMenuItem
                  key={p}
                  onClick={() => handlePeriodChange(p)}
                  className={cn(
                    'cursor-pointer',
                    period === p && 'bg-accent text-accent-foreground'
                  )}
                >
                  {periodLabels[p]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className='flex h-[300px] items-center justify-center'>
            <div className='border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent' />
          </div>
        ) : (
          <ResponsiveContainer width='100%' height={300}>
            <LineChart
              data={data?.chart_data || []}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray='3 3'
                stroke='hsl(var(--border))'
              />
              <XAxis
                dataKey='label'
                stroke='hsl(var(--muted-foreground))'
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke='hsl(var(--muted-foreground))'
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatYAxis}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                formatter={(value: number) => [
                  formatTooltipValue(value),
                  'Pembayaran',
                ]}
              />
              <Line
                type='monotone'
                dataKey='value'
                stroke='hsl(var(--primary))'
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}

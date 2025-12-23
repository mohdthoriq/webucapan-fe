import { useState } from 'react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { MoreVertical, Filter } from 'lucide-react'
import type { DateRange } from 'react-day-picker'
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
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu'
import { useTotalPaymentsQuery } from '../hooks/use-total-payments-query'

type Period = 'day' | 'week' | 'month' | 'year' | 'custom'

interface PaymentChartCardProps {
  className?: string
}

export function PaymentChartCard({ className }: PaymentChartCardProps) {
  const [period, setPeriod] = useState<Period>('month')
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  const queryParams =
    period === 'custom' && dateRange?.from && dateRange?.to
      ? {
          date_from: format(dateRange.from, 'yyyy-MM-dd'),
          date_to: format(dateRange.to, 'yyyy-MM-dd'),
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
      setDateRange(undefined)
    }
  }

  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `${value / 1000000}jt`
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
      <CardHeader className='flex flex-row items-center justify-between space-y-0'>
        <div className='flex flex-col gap-1'>
          <h3 className='text-sm font-semibold tracking-wide uppercase'>
            Pembayaran Diterima
          </h3>
          {period === 'custom' && dateRange?.from && dateRange?.to && (
            <span className='text-muted-foreground text-xs font-medium'>
              {format(dateRange.from, 'dd MMM yyyy', { locale: id })} -{' '}
              {format(dateRange.to, 'dd MMM yyyy', { locale: id })}
            </span>
          )}
        </div>
        <div className='flex items-center gap-1'>
          <Button
            variant='ghost'
            size='icon'
            className='text-muted-foreground hover:text-foreground h-8 w-8'
          >
            <Filter className='h-4 w-4' />
          </Button>
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
            <DropdownMenuContent align='end' className='w-48'>
              <DropdownMenuItem
                onClick={() => handlePeriodChange('day')}
                className={cn(period === 'day' && 'bg-accent')}
              >
                Harian
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlePeriodChange('week')}
                className={cn(period === 'week' && 'bg-accent')}
              >
                Mingguan
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlePeriodChange('month')}
                className={cn(period === 'month' && 'bg-accent')}
              >
                Bulanan
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlePeriodChange('year')}
                className={cn(period === 'year' && 'bg-accent')}
              >
                Tahunan
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger
                  className={cn(period === 'custom' && 'bg-accent')}
                >
                  Custom
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className='p-0' sideOffset={8}>
                  <div className='border-b p-3'>
                    <div className='flex items-center justify-between gap-2'>
                      <div className='border-input rounded-md border px-3 py-1 text-xs'>
                        {dateRange?.from
                          ? format(dateRange.from, 'dd/MM/yyyy')
                          : 'Pilih tanggal'}
                      </div>
                      <span className='text-muted-foreground text-xs'>s/d</span>
                      <div className='border-input rounded-md border px-3 py-1 text-xs'>
                        {dateRange?.to
                          ? format(dateRange.to, 'dd/MM/yyyy')
                          : 'Pilih tanggal'}
                      </div>
                    </div>
                  </div>
                  <Calendar
                    mode='range'
                    selected={dateRange}
                    onSelect={(range) => {
                      setDateRange(range)
                      if (range?.from && range?.to) {
                        setPeriod('custom')
                      }
                    }}
                    locale={id}
                    autoFocus
                  />
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className='flex h-[400px] items-center justify-center'>
            <div className='border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent' />
          </div>
        ) : (
          <ResponsiveContainer width='100%' height={400}>
            <LineChart data={data?.chart_data || []}>
              <CartesianGrid stroke='#e5e5e5' className='stroke-[0.2px]' />
              <XAxis
                dataKey='label'
                stroke='#71717a'
                fontSize={12}
                tickLine={false}
                axisLine={false}
                height={40}
                dy={15}
                tickMargin={10}
              />
              <YAxis
                stroke='#71717a'
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatYAxis}
                dx={-30}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  border: '1px solid #27272a',
                  borderRadius: 'var(--radius)',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                itemStyle={{ color: '#fafafa' }}
                cursor={{
                  stroke: '#71717a',
                  strokeWidth: 1,
                  strokeDasharray: '4 4',
                }}
                formatter={(value: number) => [
                  formatTooltipValue(value),
                  'Pembayaran',
                ]}
              />
              <Line
                type='natural'
                dataKey='value'
                stroke='#36a2eb'
                strokeWidth={3}
                animationEasing='ease-in-out'
                dot={{ fill: '#36a2eb', r: 4, strokeWidth: 1 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}

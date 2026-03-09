import { useState } from 'react'
import { format } from 'date-fns'
import type { DateRange } from 'react-day-picker'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CardAction } from '@/features/purchases/overview/components/card-action'
import type { Period } from '@/features/purchases/overview/types/purchases-overview'
import { useSalesOverviewQuery } from '../hooks/use-sales-overview-query'

interface SalesDashboardOverviewProps {
  externalPeriod?: Period
  externalDateFrom?: string
  externalDateTo?: string
}

export function SalesDashboardOverview({
  externalPeriod,
  externalDateFrom,
  externalDateTo,
}: SalesDashboardOverviewProps) {
  const [period, setPeriod] = useState<Period>('month')
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)

  // Use external props if provided, otherwise use local state
  const periodToUse = externalPeriod ?? period
  const dateFromToUse =
    externalDateFrom ??
    (dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined)
  const dateToToUse =
    externalDateTo ??
    (dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined)

  const { data } = useSalesOverviewQuery({
    period: periodToUse,
    date_from: dateFromToUse as string,
    date_to: dateToToUse as string,
  })

  const chartData = data?.chart_data ?? []

  const formatYAxis = (value: number) => {
    return formatNumber(value)
  }

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0'>
        <CardTitle className='text-base font-semibold'>PENJUALAN</CardTitle>
        <CardAction
          period={period}
          dateRange={dateRange}
          setPeriod={setPeriod}
          setDateRange={setDateRange}
          onChange={(value) => setPeriod(value)}
        />
      </CardHeader>
      <CardContent>
        <div className='mb-4 flex-1'>
          <div className='flex items-center justify-end gap-2'>
            <span className='text-muted-foreground text-sm'>Penjualan</span>
            <span className='text-sm font-semibold'>
              {formatCurrency(data?.value ?? 0)}
            </span>
          </div>
        </div>

        <ResponsiveContainer width='100%' height={280}>
          <BarChart data={chartData}>
            <CartesianGrid stroke='#e5e5e5' className='stroke-[0.2px]' />
            <XAxis
              dataKey='label'
              stroke='#71717a'
              fontSize={12}
              tickLine={false}
              axisLine={false}
              height={chartData.length > 10 ? 60 : 40}
              dy={15}
              tickMargin={10}
              interval={chartData.length > 10 ? 0 : 'preserveStartEnd'}
              angle={chartData.length > 10 ? -45 : 0}
              textAnchor={chartData.length > 10 ? 'end' : 'middle'}
            />
            <YAxis
              stroke='#71717a'
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickCount={7}
              tickFormatter={formatYAxis}
              dx={12}
            />
            <Bar
              dataKey='value'
              fill='#ec4899'
              radius={[4, 4, 0, 0]}
              className='fill-green-400'
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

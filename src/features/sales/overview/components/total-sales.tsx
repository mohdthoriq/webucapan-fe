import { useState } from 'react'
import { useTotalSalesQuery } from '../hooks/use-total-sales-query'
import { CardStatistic } from './card-statistic'
import type { Period } from '../types/sales-overview'
import type { DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import { CardAction } from './card-action'

export function TotalSales() {
  const [period, setPeriod] = useState<Period>('month')
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  const queryParams =
    period === 'custom' && dateRange?.from && dateRange?.to
      ? {
        date_from: format(dateRange.from, 'yyyy-MM-dd'),
        date_to: format(dateRange.to, 'yyyy-MM-dd'),
        period: 'day' as const,
      }
      : {
        date_from: '',
        date_to: '',
        period: period === 'custom' ? 'month' : period,
      }


  const handlePeriodChange = (newPeriod: Period) => {
    setPeriod(newPeriod)
    if (newPeriod !== 'custom') {
      setDateRange(undefined)
    }
  }

  const { data: totalSales } = useTotalSalesQuery(queryParams)
  return (
    <CardStatistic
      title='Penjualan'
      value={totalSales?.value}
      count={totalSales?.count}
      trend={totalSales?.trend}
      cardAction={
        <CardAction
          period={period}
          dateRange={dateRange}
          setPeriod={setPeriod}
          setDateRange={setDateRange}
          onChange={handlePeriodChange}
        />
      }
    />
  )
}

import { useTotalSalesQuery } from '../hooks/use-total-sales-query'
import { CardStatistic } from './card-statistic'

export function TotalSales() {
  const { data: totalSales } = useTotalSalesQuery()
  return (
    <CardStatistic
      title='Penjualan'
      value={totalSales?.value}
      count={totalSales?.count}
      trend={totalSales?.trend}
    />
  )
}

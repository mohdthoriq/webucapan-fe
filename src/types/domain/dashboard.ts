import type {
  ChartData,
  Trend,
} from '@/features/sales/overview/types/sales-overview'

export interface DashboardData {
  value: number
  count: number
  trend: Trend
  chart_data: ChartData[]
}

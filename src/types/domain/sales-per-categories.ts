import type { PaginationMeta } from '../api/pagination'

export interface CategorySalesReportResponse {
  success: boolean
  data: CategorySalesReport
  message: string
}

export interface CategorySalesReport {
  items: CategorySalesReportItem[]
  pagination: PaginationMeta
  summary: CategorySalesReportSummary
}

export interface CategorySalesReportItem {
  category_id: string
  category_name: string
  total_sales: number
  quantity_sold: number
}

export interface CategorySalesReportSummary {
  total_quantity: number
  total_sales: number
}

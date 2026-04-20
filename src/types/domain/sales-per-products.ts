import type { PaginationMeta } from '../api/pagination'

export interface ProductSalesReportResponse {
  success: boolean
  data: ProductSalesReport
  message: string
}

export interface ProductSalesReport {
  items: ProductSalesReportItem[]
  pagination: PaginationMeta
  summary: ProductSalesReportSummary
}

export interface ProductSalesReportItem {
  product_id: string
  product_name: string
  product_code: string
  category_name: string
  quantity_sold: number
  total_sales: number
  total_cost: number
  gross_profit: number
}

export interface ProductSalesReportSummary {
  total_quantity: number
  total_sales: number
  total_cost: number
  total_profit: number
}

import type { GlobalResponse } from "@/types/api/global-response"

export interface InvoiceItem extends GlobalResponse {
  product_id: string
  description: string | undefined
  quantity: number
  unit_price: number
  discount: number | null
  tax_id: string | null
  total: number
}

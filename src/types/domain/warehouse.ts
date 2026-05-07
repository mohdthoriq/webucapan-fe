import type { GlobalResponse } from '../api/global-response'

export interface Warehouse extends GlobalResponse {
  name: string
  code: string
  total_quantity?: number
  total_value?: number
  company_id: string
  description?: string
  address?: string
}

import type { GlobalResponse } from '../api/global-response'

export interface Package extends GlobalResponse {
  name: string
  monthly_price: number
  yearly_price: number
  features: string[]
  description: string
  is_active: boolean
}

import type { GlobalResponse } from '../api/global-response'

export interface Plan extends GlobalResponse {
  name: string
  code: string
  monthly_price: number
  yearly_price: number
  features: string[]
  description: string
  is_active: boolean
}

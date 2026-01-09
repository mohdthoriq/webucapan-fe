import type { GlobalResponse } from '../api/global-response'
import type { Company } from './company'

export interface PaymentTerm extends GlobalResponse {
  name: string
  days: number
  description?: string
  company: Company
}

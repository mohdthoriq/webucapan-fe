import type { Company } from './company'
import type { GlobalResponse } from '../api/global-response'

export interface PaymentTerm extends GlobalResponse {
  name: string
  days: number
  description?: string  
  company: Company
}

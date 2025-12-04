import type { Company } from './company'

export interface PaymentTerm {
  id: string
  created_at: Date
  updated_at: Date

  name: string
  days: number
  description?: string
  company: Company
}

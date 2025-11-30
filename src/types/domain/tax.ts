import type { Company } from './company'

export interface Tax {
  id: string
  company: Company
  name: string
  rate: number
  description: string
  created_at: Date
  updated_at: Date
}

import type { GlobalResponse } from '../api/global-response'
import type { Company } from './company'

export interface Tax extends GlobalResponse {
  company: Company
  name: string
  rate: number
  description: string
}

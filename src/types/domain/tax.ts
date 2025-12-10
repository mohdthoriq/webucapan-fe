import type { Company } from './company'
import type { GlobalResponse } from '../api/global-response'

export interface Tax extends GlobalResponse {
  company: Company
  name: string
  rate: number
  description: string
}

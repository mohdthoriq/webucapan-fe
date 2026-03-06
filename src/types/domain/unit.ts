import type { GlobalResponse } from '../api/global-response'
import type { Company } from './company'

export interface Unit extends GlobalResponse {
  company: Company
  name: string
  code: string
  is_deletable: boolean
}

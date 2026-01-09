import type { GlobalResponse } from '../api/global-response'
import type { Company } from './company'

export interface ProductCategory extends GlobalResponse {
  name: string
  description: string
  company: Company
}

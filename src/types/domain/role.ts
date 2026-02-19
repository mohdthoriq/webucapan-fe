import type { GlobalResponse } from '../api/global-response'
import { type Company } from './company'

export interface Role extends GlobalResponse {
  name: string
  description: string
}

export interface CompanyRole extends Role {
  company: Company
  company_id: string
  is_default: boolean
  system_role: boolean
  is_pos: boolean
  position: number
}

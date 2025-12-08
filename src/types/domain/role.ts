import { type Company } from "./company"

export interface Role {
  id: string
  name: string
  description: string
}

export interface CompanyRole extends Role {
  company: Company
  is_default: boolean
  system_role: boolean
  created_at: Date
  updated_at: Date
}

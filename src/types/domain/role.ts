import { type Company } from "./company"
import type { GlobalResponse } from "../api/global-response"

export interface Role extends GlobalResponse {
  name: string
  description: string
}

export interface CompanyRole extends Role {
  company: Company
  is_default: boolean
  system_role: boolean
}

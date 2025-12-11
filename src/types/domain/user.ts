import type { GlobalResponse } from "../api/global-response"
import type { Company } from "./company"
import type { Role } from "./role"

export interface User extends GlobalResponse {
  full_name: string
  email: string
  is_active: boolean
  email_verified: boolean
  email_verified_at: Date
  company: Company
  role: Role
}
  
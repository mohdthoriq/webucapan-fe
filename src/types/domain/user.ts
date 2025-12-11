import type { GlobalResponse } from "../api/global-response"

export interface User extends GlobalResponse {
  full_name: string
  email: string
  is_active: boolean
  email_verified: boolean
  email_verified_at: Date
}
  
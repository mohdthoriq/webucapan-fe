export interface User {
  id: string
  created_at: Date
  updated_at: Date
  full_name: string
  email: string
  is_active: boolean
  email_verified: boolean
  email_verified_at: Date
}

export interface ProfileResponse {
  user: ProfileUser
  role: ProfileRole
  permissions: string[]
  accessToken: string
  refreshToken: string
  company: ProfileCompany
}

export interface ProfileRole {
  id: string
  name: string
  description: string
}

export interface ProfileUser {
  id: string
  full_name: string
  email: string
  is_active: boolean
  email_verified: boolean
  email_verified_at: Date
  created_at: Date
  updated_at: Date
}

export interface ProfileCompany {
  id: string
  name: string
  npwp: string
  address: string
  logo_url: null
}

export interface ProfileResponse {
  user: ProfileUser
  role: ProfileRole
  permissions: string[]
  accessToken: string
  refreshToken: string
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
  company: ProfileCompany
}

export interface ProfileCompany {
  id: string
  name: string
  npwp: string
  address: string
  logo_url: null
}

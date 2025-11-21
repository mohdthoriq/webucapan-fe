export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: LoginUser
  role: LoginRole
  permissions: LoginPermission[]
  accessToken: string
  refreshToken: string
}

export interface LoginPermission {
  name: string
}

export interface LoginRole {
  id: string
  name: string
  description: string
}

export interface LoginUser {
  id: string
  full_name: string
  email: string
  is_active: boolean
  company: LoginCompany
}

export interface LoginCompany {
  id: string
  name: string
  npwp: string
  address: string
  logo_url: null
}

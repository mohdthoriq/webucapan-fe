import type { Company } from './company'
import type { Role } from './role'
import type { User } from './user'

export interface AuthMe {
  user: User
  company: Company
  role: Role
  permissions: string[]
}

export interface LoginResponse extends AuthMe {
  accessToken: string
  refreshToken: string
}

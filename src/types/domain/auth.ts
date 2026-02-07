import type { Company } from './company'
import type { Role } from './role'
import type { User } from './user'

export enum AuthPurpose {
  Login = 'login',
  PasswordReset = 'password-reset',
  Registration = 'registration',
  EmailChange = 'email-change',
}

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

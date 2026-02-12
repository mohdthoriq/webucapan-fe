import type { Company } from './company'
import type { Menu } from './menu'
import type { Role } from './role'
import type { Subscription } from './subscriptions'
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
  menus: Menu[]
  subscription?: Subscription
}

export interface LoginResponse extends AuthMe {
  accessToken: string
  refreshToken: string
}

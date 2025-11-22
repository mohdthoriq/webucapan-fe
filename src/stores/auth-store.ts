import { create } from 'zustand'
import { getCookie, setCookie, removeCookie } from '@/lib/cookies'

const ACCESS_TOKEN = 'thisisjustarandomstring'
const USER_DATA = 'user_data'

export interface AuthUser {
  user: User
  company: Company
  role: Role
  permissions: string[]
}

export interface Company {
  id: string
  name: string
  address: string
}

export interface Role {
  id: string
  name: string
}

export interface User {
  id: string
  full_name: string
  email: string
  is_active: boolean
  email_verified: boolean
  email_verified_at: Date
  created_at: Date
  updated_at: Date
}

interface AuthState {
  auth: {
    user: AuthUser | null
    setUser: (user: AuthUser | null) => void
    accessToken: string
    setAccessToken: (accessToken: string) => void
    resetAccessToken: () => void
    reset: () => void
  }
}

export const useAuthStore = create<AuthState>()((set) => {
  const cookieState = getCookie(ACCESS_TOKEN)
  const initToken =
    cookieState && cookieState !== 'undefined' ? JSON.parse(cookieState) : ''
  
  // Get user data from cookie
  const getUserFromCookie = (): AuthUser | null => {
    try {
      const userData = getCookie(USER_DATA)
      return userData && userData !== 'undefined' ? JSON.parse(userData) : null
    } catch {
      return null
    }
  }

  return {
    auth: {
      user: getUserFromCookie(),
      setUser: (user) =>
        set((state) => {
          // Persist user data to cookie
          if (user) {
            setCookie(USER_DATA, JSON.stringify(user))
          } else {
            removeCookie(USER_DATA)
          }
          return { ...state, auth: { ...state.auth, user } }
        }),
      accessToken: initToken,
      setAccessToken: (accessToken) =>
        set((state) => {
          setCookie(ACCESS_TOKEN, JSON.stringify(accessToken))
          return { ...state, auth: { ...state.auth, accessToken } }
        }),
      resetAccessToken: () =>
        set((state) => {
          removeCookie(ACCESS_TOKEN)
          return { ...state, auth: { ...state.auth, accessToken: '' } }
        }),
      reset: () =>
        set((state) => {
          removeCookie(ACCESS_TOKEN)
          removeCookie(USER_DATA)
          return {
            ...state,
            auth: { ...state.auth, user: null, accessToken: '' },
          }
        }),
    },
  }
})

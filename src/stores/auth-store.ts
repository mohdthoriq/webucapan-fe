import type { AuthMe } from '@/types'
import { create } from 'zustand'
import { getCookie, setCookie, removeCookie } from '@/lib/cookies'

const ACCESS_TOKEN =
  import.meta.env.VITE_ACCESS_TOKEN || 'thisIsJustRandomString'
const REFRESH_TOKEN =
  import.meta.env.VITE_REFRESH_TOKEN || 'thisIsJustRandomStringRefresh'
const USER_DATA = import.meta.env.VITE_USER_DATA || 'userData'

interface AuthState {
  auth: {
    user: AuthMe | null
    setUser: (user: AuthMe | null) => void
    accessToken: string
    refreshToken: string
    setAccessToken: (accessToken: string) => void
    setRefreshToken: (refreshToken: string) => void
    setTokens: (accessToken: string, refreshToken: string) => void
    resetAccessToken: () => void
    reset: () => void
  }
}

export const useAuthStore = create<AuthState>()((set) => {
  const cookieState = getCookie(ACCESS_TOKEN)
  const initToken =
    cookieState && cookieState !== 'undefined' ? JSON.parse(cookieState) : ''

  const refreshCookieState = getCookie(REFRESH_TOKEN)
  const initRefreshToken =
    refreshCookieState && refreshCookieState !== 'undefined'
      ? JSON.parse(refreshCookieState)
      : ''

  // Get user data from cookie
  const getUserFromCookie = (): AuthMe | null => {
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
      refreshToken: initRefreshToken,
      setAccessToken: (accessToken) =>
        set((state) => {
          setCookie(ACCESS_TOKEN, JSON.stringify(accessToken))
          return { ...state, auth: { ...state.auth, accessToken } }
        }),
      setRefreshToken: (refreshToken) =>
        set((state) => {
          setCookie(REFRESH_TOKEN, JSON.stringify(refreshToken))
          return { ...state, auth: { ...state.auth, refreshToken } }
        }),
      setTokens: (accessToken, refreshToken) =>
        set((state) => {
          setCookie(ACCESS_TOKEN, JSON.stringify(accessToken))
          setCookie(REFRESH_TOKEN, JSON.stringify(refreshToken))
          return {
            ...state,
            auth: { ...state.auth, accessToken, refreshToken },
          }
        }),
      resetAccessToken: () =>
        set((state) => {
          removeCookie(ACCESS_TOKEN)
          return { ...state, auth: { ...state.auth, accessToken: '' } }
        }),
      reset: () =>
        set((state) => {
          removeCookie(ACCESS_TOKEN)
          removeCookie(REFRESH_TOKEN)
          removeCookie(USER_DATA)
          return {
            ...state,
            auth: {
              ...state.auth,
              user: null,
              accessToken: '',
              refreshToken: '',
            },
          }
        }),
    },
  }
})

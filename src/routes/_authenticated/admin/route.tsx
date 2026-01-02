import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'

export const Route = createFileRoute('/_authenticated/admin')({
  beforeLoad: () => {
    const {
      auth: { isAuthenticated, resetAccessToken, user },
    } = useAuthStore.getState()
    if (!isAuthenticated || user?.role?.name !== 'superadmin') {
      resetAccessToken()
      throw redirect({
        to: '/login',
      })
    }
  },
})

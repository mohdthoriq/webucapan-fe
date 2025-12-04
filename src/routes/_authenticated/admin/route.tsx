import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'

export const Route = createFileRoute('/_authenticated/admin')({
  beforeLoad: ({ location }) => {
    const {
      auth: { isAuthenticated, resetAccessToken, user },
      errorAuthMessage,
    } = useAuthStore.getState()
    if (!isAuthenticated || user?.role?.name !== 'superadmin') {
      resetAccessToken()
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
          error: errorAuthMessage,
        },
      })
    }
  },
})

import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ location }) => {
    const {
      auth: { isAuthenticated, resetAccessToken },
      errorAuthMessage,
    } = useAuthStore.getState()
    if (!isAuthenticated) {
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
  component: AuthenticatedLayout,
})

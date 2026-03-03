import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import apiClient from '@/lib/api-client'
import { ConfirmDialog } from '@/components/dialog/confirm.dialog'

interface LogoutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LogoutDialog({ open, onOpenChange }: LogoutDialogProps) {
  const navigate = useNavigate()
  const { auth } = useAuthStore()
  const queryClient = useQueryClient()

  const handleSignOut = async () => {
    queryClient.cancelQueries()
    queryClient.clear()

    try {
      await apiClient.post('/auth/logout').catch(() => {})
    } catch {
      //
    } finally {
      auth.reset()
      navigate({
        to: '/login',
        replace: true,
      })
    }
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title='Keluar'
      desc='Apakah Anda yakin ingin keluar? Anda perlu masuk lagi untuk mengakses akun Anda.'
      confirmText='Keluar'
      destructive
      handleConfirm={handleSignOut}
      className='sm:max-w-sm'
    />
  )
}

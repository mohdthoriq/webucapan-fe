import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema, type LoginFormData } from '../types/login.types'
import { useLoginMutation } from './useLoginMutation'
import { useResendOtpMutation } from './useResendOtpMutation'
import { useUnverifiedEmailDialog } from './useUnverifiedEmailDialog'

export function useLoginForm() {
  const unverifiedEmailDialog = useUnverifiedEmailDialog()
  const resendOtpMutation = useResendOtpMutation()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const loginMutation = useLoginMutation({
    onUnverifiedEmail: (email) => {
      unverifiedEmailDialog.openDialog(email)
    },
  })

  function onSubmit(data: LoginFormData) {
    loginMutation.mutate(data)
  }

  function handleResendOtp() {
    if (unverifiedEmailDialog.email) {
      resendOtpMutation.mutate({
        email: unverifiedEmailDialog.email,
        purpose: 'registration',
        redirectTo: '/verify-email',
      })
    }
  }

  return {
    form,
    isLoading: loginMutation.isPending,
    onSubmit,
    unverifiedEmailDialog: {
      ...unverifiedEmailDialog,
      onResendOtp: handleResendOtp,
    },
  }
}

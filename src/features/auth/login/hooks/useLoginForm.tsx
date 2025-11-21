import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema, type LoginFormValues } from '../types/login.types'
import { useLoginMutation } from './useLoginMutation'
import { useResendOtpMutation } from './useResendOtpMutation'
import { useUnverifiedEmailDialog } from './useUnverifiedEmailDialog'

interface UseLoginFormProps {
  redirectTo?: string
}

export function useLoginForm({ redirectTo }: UseLoginFormProps = {}) {
  const unverifiedEmailDialog = useUnverifiedEmailDialog()
  const resendOtpMutation = useResendOtpMutation()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const loginMutation = useLoginMutation({
    redirectTo,
    onUnverifiedEmail: (email) => {
      unverifiedEmailDialog.openDialog(email)
    },
  })

  function onSubmit(data: LoginFormValues) {
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

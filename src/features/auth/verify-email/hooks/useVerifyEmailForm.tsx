import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearch } from '@tanstack/react-router'
import { useResendOtpMutation } from '../../login/hooks/useResendOtpMutation'
import {
  type VerifyEmailFormData,
  VerifyEmailSchema,
} from '../types/verify-email.types'
import { useVerifyEmailMutation } from './useVerifyEmailMutation'

export function useVerifyEmailForm() {
  const search = useSearch({ from: '/(auth)/verify-email' })
  const resendOtpMutation = useResendOtpMutation()

  const form = useForm<VerifyEmailFormData>({
    resolver: zodResolver(VerifyEmailSchema),
    defaultValues: {
      otp_code: '',
      email: search.email || '',
      purpose: 'registration',
    },
  })

  const verifyEmailMutation = useVerifyEmailMutation()

  function onSubmit(data: VerifyEmailFormData) {
    verifyEmailMutation.mutate(data)
  }

  function handleResendOtp() {
    const email = form.getValues('email')
    if (email) {
      resendOtpMutation.mutate({
        email,
        purpose: 'registration',
        redirectTo: '/verify-email',
      })
    }
  }

  return {
    form,
    isLoading: verifyEmailMutation.isPending,
    isResending: resendOtpMutation.isPending,
    onSubmit,
    onResendOtp: handleResendOtp,
  }
}

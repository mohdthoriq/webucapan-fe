import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { AuthPurpose } from '@/types'
import { useResendOtpMutation } from '../../login/hooks/useResendOtpMutation'
import {
  type VerifyEmailFormData,
  VerifyEmailSchema,
} from '../types/verify-email.types'
import { useVerifyEmailMutation } from './useVerifyEmailMutation'

export function useVerifyEmailForm() {
  const navigate = useNavigate()
  const search = useSearch({ from: '/(auth)/verify-email' })
  const resendOtpMutation = useResendOtpMutation()

  const form = useForm<VerifyEmailFormData>({
    resolver: zodResolver(VerifyEmailSchema),
    defaultValues: {
      otp_code: '',
      email: search.email || '',
      purpose: search.purpose,
    },
  })

  const verifyEmailMutation = useVerifyEmailMutation()

  function onSubmit(data: VerifyEmailFormData) {
    if (data.purpose === AuthPurpose.Registration) {
      verifyEmailMutation.mutate(data)
    } else {
      navigate({
        to: '/reset-password',
        replace: true,
        search: { email: data.email, otp_code: data.otp_code },
      })
    }
  }

  function handleResendOtp() {
    const email = form.getValues('email')
    if (email) {
      resendOtpMutation.mutate({
        email,
        purpose: search.purpose,
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

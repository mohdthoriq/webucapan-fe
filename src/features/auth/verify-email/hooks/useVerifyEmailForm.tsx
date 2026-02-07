import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { AuthPurpose } from '@/types'
import { useAuthFlowStore } from '@/stores/auth-flow-store'
import { useResendOtpMutation } from '../../login/hooks/useResendOtpMutation'
import {
  type VerifyEmailFormData,
  VerifyEmailSchema,
} from '../types/verify-email.types'
import { useVerifyEmailMutation } from './useVerifyEmailMutation'

export function useVerifyEmailForm() {
  const navigate = useNavigate()
  const { email, purpose, setAuthFlow } = useAuthFlowStore()
  const resendOtpMutation = useResendOtpMutation()

  const form = useForm<VerifyEmailFormData>({
    resolver: zodResolver(VerifyEmailSchema),
    defaultValues: {
      otp_code: '',
      email: email || '',
      purpose: purpose || AuthPurpose.Registration,
    },
  })

  const verifyEmailMutation = useVerifyEmailMutation()

  function onSubmit(data: VerifyEmailFormData) {
    if (data.purpose === AuthPurpose.Registration) {
      verifyEmailMutation.mutate(data)
    } else {
      setAuthFlow({ otp_code: data.otp_code })

      navigate({
        to: '/reset-password',
        replace: true,
      })
    }
  }

  function handleResendOtp() {
    const emailValue = form.getValues('email')
    if (emailValue) {
      resendOtpMutation.mutate({
        email: emailValue,
        purpose: purpose || AuthPurpose.Registration,
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

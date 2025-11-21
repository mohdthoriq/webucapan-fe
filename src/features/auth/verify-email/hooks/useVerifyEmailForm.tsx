import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearch } from '@tanstack/react-router'
import {
  type VerifyEmailFormValues,
  VerifyEmailSchema,
} from '../types/verify-email.types'
import { useVerifyEmailMutation } from './useVerifyEmailMutation'

export function useVerifyEmailForm() {
  const search = useSearch({ from: '/(auth)/verify-email' })

  const form = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(VerifyEmailSchema),
    defaultValues: {
      otp_code: '',
      email: search.email || '',
      purpose: 'registration',
    },
  })

  const verifyEmailMutation = useVerifyEmailMutation()

  function onSubmit(data: VerifyEmailFormValues) {
    verifyEmailMutation.mutate(data)
  }

  return {
    form,
    isLoading: verifyEmailMutation.isPending,
    onSubmit,
  }
}

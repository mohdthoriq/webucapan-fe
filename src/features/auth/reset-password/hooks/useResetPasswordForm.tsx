import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearch } from '@tanstack/react-router'
import {
  ResetPasswordSchema,
  type ResetPasswordFormValues,
} from '../types/reset-password.types'
import { useResetPasswordMutation } from './useResetPasswordMutation'

interface UseResetPasswordFormProps {
  redirectTo?: string
}

export function useResetPasswordForm({
  redirectTo,
}: UseResetPasswordFormProps = {}) {
  const search = useSearch({ from: '/(auth)/reset-password' })

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      token: search.token || '',
      password: '',
      confirmPassword: '',
    },
  })

  const resetPasswordMutation = useResetPasswordMutation({ redirectTo })

  function onSubmit(data: ResetPasswordFormValues) {
    resetPasswordMutation.mutate(data)
  }

  return {
    form,
    isLoading: resetPasswordMutation.isPending,
    onSubmit,
  }
}

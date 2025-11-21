import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ForgotPasswordSchema,
  type ForgotPasswordFormValues,
} from '../types/forgot-password.types'
import { useForgotPasswordMutation } from './useForgotPasswordMutation'

interface UseForgotPasswordFormProps {
  redirectTo?: string
}

export function useForgotPasswordForm({
  redirectTo,
}: UseForgotPasswordFormProps = {}) {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const forgotPasswordMutation = useForgotPasswordMutation({ redirectTo })

  function onSubmit(data: ForgotPasswordFormValues) {
    forgotPasswordMutation.mutate(data)
  }

  return {
    form,
    isLoading: forgotPasswordMutation.isPending,
    onSubmit,
  }
}

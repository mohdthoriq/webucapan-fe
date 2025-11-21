import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema, type LoginFormValues } from '../types/login.types'
import { useLoginMutation } from './useLoginMutation'

interface UseLoginFormProps {
  redirectTo?: string
}

export function useLoginForm({ redirectTo }: UseLoginFormProps = {}) {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const loginMutation = useLoginMutation({ redirectTo })

  function onSubmit(data: LoginFormValues) {
    loginMutation.mutate(data)
  }

  return {
    form,
    isLoading: loginMutation.isPending,
    onSubmit,
  }
}

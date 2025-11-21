import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  type RegisterFormValues,
  RegisterSchema,
} from '../types/register.types'
import { useRegisterMutation } from './useRegisterMutation'

export function useRegisterForm() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      full_name: '',
      company_name: '',
      address: '',
      password: '',
      confirmPassword: '',
    },
  })

  const registerMutation = useRegisterMutation()

  function onSubmit(data: RegisterFormValues) {
    registerMutation.mutate(data)
  }

  return {
    form,
    isLoading: registerMutation.isPending,
    onSubmit,
  }
}

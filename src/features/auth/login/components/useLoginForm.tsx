import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLoginMutation } from '../hooks/useLoginMutation'

const formSchema = z.object({
  email: z.email({
    error: (iss) =>
      iss.input === '' ? 'Silakan masukkan email Anda' : undefined,
  }),
  password: z
    .string()
    .min(1, 'Silakan masukkan kata sandi Anda')
    .min(7, 'Kata sandi harus minimal 7 karakter'),
})

export type LoginFormValues = z.infer<typeof formSchema>

interface UseLoginFormProps {
  redirectTo?: string
}

export function useLoginForm({ redirectTo }: UseLoginFormProps = {}) {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
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

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import {
  userSettingsSchema,
  type UserSettingsFormData,
} from '../types/user-settings.schema'

export function useUserSettingsForm() {
  const user = useAuthStore((state) => state.auth.user)

  const form = useForm<UserSettingsFormData>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      full_name: user?.user.full_name || '',
      email: user?.user.email || '',
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
  })

  const onSubmit = async (data: UserSettingsFormData) => {
    try {
      // TODO: Implement API call to update user settings
      // eslint-disable-next-line no-console
      console.log('User settings data:', data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success('Profil berhasil diperbarui')

      // Reset password fields after successful update
      form.setValue('current_password', '')
      form.setValue('new_password', '')
      form.setValue('confirm_password', '')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error updating user settings:', error)
      toast.error('Gagal memperbarui profil')
    }
  }

  return {
    form,
    onSubmit,
    isLoading: form.formState.isSubmitting,
  }
}

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import {
  userSettingsSchema,
  type UserSettingsFormData,
} from '../types/user-settings.schema'
import { useUserSettingsMutation } from './use-user-settings-mutation'

export function useUserSettingsForm() {
  const user = useAuthStore((state) => state.auth.user)

  const userSettingsMutation = useUserSettingsMutation(user?.user?.id || '')

  const form = useForm<UserSettingsFormData>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      full_name: user?.user.full_name || '',
      email: user?.user.email || '',
      old_password: '',
      new_password: '',
      confirm_password: '',
    },
  })

  const onSubmit = async (data: UserSettingsFormData) => {
    try {
      await userSettingsMutation.mutateAsync(data)

      toast.success('Profil berhasil diperbarui')

      // Reset password fields after successful update
      form.setValue('old_password', '')
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
    isLoading: userSettingsMutation.isPending,
  }
}

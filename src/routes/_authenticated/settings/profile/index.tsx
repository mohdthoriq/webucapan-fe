import { createFileRoute } from '@tanstack/react-router'
import { UserSettingsForm } from '@/features/settings/profile/components/user-settings-form'

export const Route = createFileRoute('/_authenticated/settings/profile/')({
  component: UserSettingsForm,
})

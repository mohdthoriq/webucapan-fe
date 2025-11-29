import { createFileRoute } from '@tanstack/react-router'
import { CompanySettingsForm } from '@/features/settings/company/components/company-settings-form'

export const Route = createFileRoute('/_authenticated/settings/company/')({
  component: CompanySettingsForm,
})

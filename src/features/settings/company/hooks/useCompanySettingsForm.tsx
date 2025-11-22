import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import {
  companySettingsSchema,
  type CompanySettingsFormData,
} from '../types/company-settings.schema'

export function useCompanySettingsForm() {
  const company = useAuthStore((state) => state.auth.user?.company)

  const form = useForm<CompanySettingsFormData>({
    resolver: zodResolver(companySettingsSchema),
    defaultValues: {
      name: '',
      address: '',
    },
  })

  // Update form values when company data is loaded
  useEffect(() => {
    if (company) {
      form.reset({
        name: company.name || '',
        address: company.address || '',
      })
    }
  }, [company, form])

  const onSubmit = async (data: CompanySettingsFormData) => {
    try {
      // TODO: Implement API call to update company settings
      // eslint-disable-next-line no-console
      console.log('Company settings data:', data)
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      toast.success('Pengaturan perusahaan berhasil diperbarui')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error updating company settings:', error)
      toast.error('Gagal memperbarui pengaturan perusahaan')
    }
  }

  return {
    form,
    onSubmit,
    isLoading: form.formState.isSubmitting,
  }
}

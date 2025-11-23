import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import {
  companySettingsSchema,
  type CompanySettingsFormData,
} from '../types/company-settings.schema'
import { useCompanySettingsMutation } from './useCompanySettingsMutation'
import { useCompanySettingsQuery } from './useCompanySettingsQuery'

export function useCompanySettingsForm() {
  const company = useAuthStore((state) => state.auth.user?.company)

  // Fetch company data from API
  const {
    data: companyData,
    isLoading: isLoadingCompany,
    isError,
  } = useCompanySettingsQuery(company?.id)

  const form = useForm<CompanySettingsFormData>({
    resolver: zodResolver(companySettingsSchema),
    defaultValues: {
      name: '',
      address: '',
      npwp: '',
      logo_url: '',
    },
  })

  // Update form values when company data is loaded from API
  useEffect(() => {
    if (companyData) {
      form.reset({
        name: companyData.name || '',
        address: companyData.address || '',
        npwp: companyData.npwp || '',
        logo_url: companyData.logo_url || '',
      })
    }
  }, [companyData, form])

  // Show error toast if query fails
  useEffect(() => {
    if (isError) {
      toast.error('Gagal memuat data perusahaan')
    }
  }, [isError])

  const companySettingsMutation = useCompanySettingsMutation(company?.id || '')

  const onSubmit = async (data: CompanySettingsFormData) => {
    try {
      await companySettingsMutation.mutateAsync(data)

      toast.success('Pengaturan perusahaan berhasil diperbarui')
    } catch (_) {
      toast.error('Gagal memperbarui pengaturan perusahaan')
    }
  }

  return {
    form,
    onSubmit,
    isLoading: companySettingsMutation.isPending,
    isLoadingData: isLoadingCompany,
  }
}

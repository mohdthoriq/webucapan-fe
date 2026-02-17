import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import {
  companySettingsSchema,
  type CompanySettingsFormData,
} from '../types/company-settings.schema'
import { useCompanySettingsMutation } from './use-company-setting-mutation'
import { useCompanySettingsQuery } from './use-company-settings-query'
import type { AxiosError } from 'axios'
import type { ApiResponse } from '@/types'

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
      npwp: undefined,
      logo_url: '',
      email: '',
      phone: '',
    },
  })

  // Update form values when company data is loaded from API
  useEffect(() => {
    if (companyData) {
      form.reset({
        name: companyData.name || '',
        address: companyData.address || '',
        npwp: companyData.npwp || undefined,
        logo_url: companyData.logo_url || '',
        email: companyData.email || '',
        phone: companyData.phone || '',
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

  const errors = form.formState.errors
  const firstError = Object.values(errors)[0]
  const mutationError = companySettingsMutation.error
  const errorMessage =
    (mutationError
      ? (mutationError as AxiosError<ApiResponse>)?.response?.data?.message ||
        'Terjadi kesalahan saat menyimpan data'
      : null) ||
    (firstError ? firstError.message || 'Terjadi kesalahan pada input' : null)

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
    errorMessage,
  }
}

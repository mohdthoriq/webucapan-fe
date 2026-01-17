import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ApiResponse, Contact } from '@/types'
import { useAuthStore } from '@/stores/auth-store'
import {
  type CreateContactFormData,
  type UpdateContactFormData,
  createContactSchema,
} from '../types/contacts.schema'
import {
  useCreateContactMutation,
  useUpdateContactMutation,
} from './use-contacts-mutation'
import type { AxiosError } from 'axios'

type useContactsFormProps = {
  currentRow?: Contact
}

export function useContactsForm({ currentRow }: useContactsFormProps) {
  const company = useAuthStore((state) => state.auth.user?.company)

  const isEdit = !!currentRow
  const form = useForm<CreateContactFormData>({
    resolver: zodResolver(createContactSchema),
    defaultValues: isEdit
      ? {
          name: currentRow?.name ?? undefined,
          type_id: currentRow?.type?.id ?? undefined,
          phone: currentRow?.phone ?? undefined,
          email: currentRow?.email ?? undefined,
          address: currentRow?.company?.address ?? undefined,
          company_id: currentRow?.company?.id ?? company?.id ?? undefined,
        }
      : {
          company_id: company?.id ?? undefined,
          name: undefined,
          type_id: undefined,
          phone: undefined,
          email: undefined,
          address: undefined,
        },
  })

  const createMutation = useCreateContactMutation()
  const updateMutation = useUpdateContactMutation()

  const errors = form.formState.errors
  const firstError = Object.values(errors)[0]
  const mutationError = createMutation.error || updateMutation.error
  const errorMessage =
    (mutationError
      ? (mutationError as AxiosError<ApiResponse>)?.response?.data?.message ||
        'Terjadi kesalahan saat menyimpan data'
      : null) ||
    (firstError ? firstError.message || 'Terjadi kesalahan pada input' : null)

  const onSubmit = async (data: CreateContactFormData) => {
    if (isEdit && currentRow) {
      const updateData: UpdateContactFormData = {
        id: currentRow.id,
        name: data.name,
        type_id: data.type_id,
        phone: data.phone,
        email: data.email,
        address: data.address,
        company_id: data.company_id,
      }
      await updateMutation.mutateAsync(updateData)
      form.reset()
    } else {
      await createMutation.mutateAsync(data)
      form.reset()
    }
  }

  return {
    form,
    onSubmit,
    isSubmitting: createMutation.isPending || updateMutation.isPending,
    errorMessage,
  }
}

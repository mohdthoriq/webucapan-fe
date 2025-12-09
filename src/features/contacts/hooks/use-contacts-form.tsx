import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Contact } from '@/types'
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
          name: currentRow?.name,
          type_id: currentRow?.type?.id ?? '',
          phone: currentRow?.phone,
          email: currentRow?.email,
          address: currentRow?.company?.address,
          company_id: currentRow?.company?.id ?? company?.id ?? '',
        }
      : {
          company_id: company?.id ?? '',
          name: '',
          type_id: '',
          phone: '',
          email: '',
          address: '',
        },
  })

  const createMutation = useCreateContactMutation()
  const updateMutation = useUpdateContactMutation()

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
  }
}

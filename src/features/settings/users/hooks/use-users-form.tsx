import type { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ApiResponse, User } from '@/types'
import { useAuthStore } from '@/stores/auth-store'
import {
  type CreateUserFormData,
  createUserSchema,
} from '../types/users.schema'
import { useCreateUserMutation } from './use-users-mutation'
import { useEffect } from 'react'

type useUsersFormProps = {
  currentRow?: User
}

export function useUsersForm({ currentRow }: useUsersFormProps) {
  const company = useAuthStore((state) => state.auth.user?.company)
  const isEdit = !!currentRow

  const form = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: isEdit
      ? {
          email: currentRow?.email ?? '',
          full_name: currentRow?.full_name ?? '',
          role_id: currentRow?.role?.id ?? '',
          phone: currentRow?.phone ?? '',
          company_id: currentRow?.company?.id ?? company?.id ?? '',
        }
      : {
          email: '',
          full_name: '',
          role_id: '',
          phone: '',
          company_id: company?.id ?? '',
        },
  })

  useEffect(() => {
    if (!isEdit && company?.id) {
      form.setValue('company_id', company.id)
    }
  }, [company?.id, isEdit, form])

  const createMutation = useCreateUserMutation()

  const errors = form.formState.errors
  const firstError = Object.values(errors)[0]
  const mutationError = createMutation.error
  const errorMessage =
    (mutationError
      ? (mutationError as AxiosError<ApiResponse>)?.response?.data?.message ||
        'Terjadi kesalahan saat menyimpan data'
      : null) ||
    (firstError ? firstError.message || 'Terjadi kesalahan pada input' : null)

  const onSubmit = async (data: CreateUserFormData) => {
    try {
      if (isEdit && currentRow) {
        // const updateData: UpdateUserFormData = {
        //   id: currentRow.id,
        //   name: data.name,
        //   type_id: data.type_id,
        //   code: data.code,
        //   category_id: data.category_id,
        //   parent_id: data.parent_id,
        //   allow_transaction: data.allow_transaction,
        //   is_active: data.is_active,
        //   description: data.description,
        // }
        // await updateMutation.mutateAsync(updateData)
        // form.reset()
      } else {
        await createMutation.mutateAsync(data)
        
        form.reset({
          email: '',
          full_name: '',
          role_id: '',
          phone: '',
          company_id: company?.id ?? '', 
        })
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Submit error:', error);
    }
  }

  return {
    form,
    onSubmit,
    isSubmitting: createMutation.isPending,
    errorMessage,
  }
}

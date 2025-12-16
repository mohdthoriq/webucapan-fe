import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Tag } from '@/types'
import {
  createTagSchema,
  type CreateTagFormData,
  type UpdateTagFormData,
} from '@/features/settings/tags/types/tags.schema'
import {
  useCreateTagMutation,
  useUpdateTagMutation,
} from './use-tags-mutation'

type useTagsFormProps = {
  currentRow?: Tag
}

export function useTagsForm({ currentRow }: useTagsFormProps) {

  const isEdit = !!currentRow
  const form = useForm<CreateTagFormData>({
    resolver: zodResolver(createTagSchema),
    defaultValues: isEdit
      ? {
          name: currentRow?.name,
          description: currentRow?.description,
        }
      : {
          name: '',
          description: '',
        },
  })

  const createMutation = useCreateTagMutation()
  const updateMutation = useUpdateTagMutation()

  const onSubmit = async (data: CreateTagFormData) => {
    if (isEdit && currentRow) {
      const updateData: UpdateTagFormData = {
        id: currentRow.id,
        name: data.name,
        description: data.description,
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

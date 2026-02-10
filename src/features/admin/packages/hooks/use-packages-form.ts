import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Package } from '@/types'
import {
  createPackageSchema,
  type CreatePackageFormData,
  type UpdatePackageFormData,
} from '../types/packages.schema'
import {
  useCreatePackageMutation,
  useUpdatePackageMutation,
} from './use-packages-mutation'

type usePackagesFormProps = {
  currentRow?: Package
}

export function usePackagesForm({ currentRow }: usePackagesFormProps) {
  const isEdit = !!currentRow
  const form = useForm<CreatePackageFormData>({
    resolver: zodResolver(createPackageSchema),
    defaultValues: isEdit
      ? {
          name: currentRow?.name,
          description: currentRow?.description || '',
          monthly_price: Number(currentRow?.monthly_price),
          yearly_price: Number(currentRow?.yearly_price),
          features: currentRow?.features || [],
        }
      : {
          name: '',
          description: '',
          monthly_price: 0,
          yearly_price: 0,
          features: [],
        },
  })

  const createMutation = useCreatePackageMutation()
  const updateMutation = useUpdatePackageMutation()

  const onSubmit = async (data: CreatePackageFormData) => {
    if (isEdit && currentRow) {
      const updateData: UpdatePackageFormData = {
        id: currentRow.id,
        ...data,
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

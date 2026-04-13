import { useMutation } from '@tanstack/react-query'
import apiClientFormData from '@/lib/api-client-form-data'

type UploadAttachmentsParams = {
  feature: 'sales-invoices' | 'purchase-invoices' | 'expenses'
  id: string
  images: File[]
}

export function useUploadAttachmentsMutation() {
  return useMutation({
    mutationFn: async ({ feature, id, images }: UploadAttachmentsParams) => {
      const formData = new FormData()
      images.forEach((file) => {
        formData.append('images[]', file)
      })

      const response = await apiClientFormData.post(
        `${feature}/${id}/attachments`,
        formData
      )
      return response.data
    },
  })
}

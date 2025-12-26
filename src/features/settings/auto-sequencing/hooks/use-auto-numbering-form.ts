import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { FinanceNumber } from '@/types/domain/auto-numbering'
import { toast } from 'sonner'
import { useDebounce } from '@/hooks/use-debounce'
import {
  autoSequencingFormSchema,
  type AutoSequencingFormValues,
} from '../types/auto-sequencing.schema'
import {
  useUpdateAutoNumberingMutation,
  useAutoNumberingPreview,
} from './use-auto-numbering-mutation'

interface UseAutoNumberingFormProps {
  item: FinanceNumber | null
  onSuccess?: () => void
}

export function useAutoNumberingForm({
  item,
  onSuccess,
}: UseAutoNumberingFormProps) {
  const mutation = useUpdateAutoNumberingMutation()
  const previewMutation = useAutoNumberingPreview()

  const form = useForm<AutoSequencingFormValues>({
    resolver: zodResolver(autoSequencingFormSchema),
    defaultValues: {
      title: item?.title,
      format_only: '',
      sequence: 1,
      reset_every: 0,
    },
  })

  useEffect(() => {
    if (item) {
      form.reset({
        title: item.title,
        format_only: item.format_only,
        sequence: item.sequence,
        reset_every: item.reset_every,
      })
    }
  }, [item, form])

  const onSubmit = (values: AutoSequencingFormValues) => {
    if (!item) return

    mutation.mutate(
      {
        id: item.id,
        ...values,
      },
      {
        onSuccess: () => {
          toast.success('Auto numbering updated successfully')
          onSuccess?.()
        },
        onError: () => {
          toast.error('Failed to update auto numbering')
        },
      }
    )
  }

  const formatValue = useWatch({ control: form.control, name: 'format_only' })
  const sequenceValue = useWatch({
    control: form.control,
    name: 'sequence',
  })

  const debouncedFormat = useDebounce(formatValue, 500)
  const debouncedSequence = useDebounce(sequenceValue, 500)

  useEffect(() => {
    if (debouncedFormat && debouncedSequence) {
      previewMutation.mutate({
        format_only: debouncedFormat,
        sequence: Number(debouncedSequence),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFormat, debouncedSequence])

  const exampleOutput = previewMutation.data || ''

  const handleAddCode = (code: string) => {
    const currentFormat = form.getValues('format_only')
    form.setValue('format_only', `${currentFormat}/${code}`)
  }

  return {
    form,
    onSubmit,
    exampleOutput,
    handleAddCode,
    isPending: mutation.isPending,
    isPreviewLoading: previewMutation.isPending,
  }
}

import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { FinanceNumber } from '@/types/domain/auto-numbering'
import { toast } from 'sonner'
import {
  autoSequencingFormSchema,
  type AutoSequencingFormValues,
} from '../types/auto-sequencing.schema'
import { useUpdateAutoNumberingMutation } from './use-auto-numbering-mutation'

interface UseAutoNumberingFormProps {
  item: FinanceNumber | null
  onSuccess?: () => void
}

export function useAutoNumberingForm({
  item,
  onSuccess,
}: UseAutoNumberingFormProps) {
  const mutation = useUpdateAutoNumberingMutation()

  const form = useForm<AutoSequencingFormValues>({
    resolver: zodResolver(autoSequencingFormSchema),
    defaultValues: {
      format: '',
      current_number: 1,
      reset_frequency: 'never',
    },
  })

  const getResetFrequency = (frequency: number) => {
    switch (frequency) {
      case 0:
        return 'never'
      case 30:
        return 'monthly'
      case 365:
        return 'yearly'
    }
  }

  useEffect(() => {
    if (item) {
      form.reset({
        format: item.format_only,
        current_number: item.sequence,
        reset_frequency: item.reset_every ? getResetFrequency(item.reset_every) : 'never',
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

  const formatValue = useWatch({ control: form.control, name: 'format' })
  const sequenceValue = useWatch({
    control: form.control,
    name: 'current_number',
  })

  const getExampleOutput = (fmt: string, seq: number) => {
    if (!fmt) return ''
    let output = fmt
    const paddedSeq = seq.toString().padStart(5, '0')
    output = output.replace(/\[NUMBER\]/g, paddedSeq)

    const now = new Date()
    output = output.replace(/\[YEAR\]/g, now.getFullYear().toString())
    output = output.replace(
      /\[MONTH\]/g,
      (now.getMonth() + 1).toString().padStart(2, '0')
    )
    output = output.replace(
      /\[DAY\]/g,
      now.getDate().toString().padStart(2, '0')
    )

    return output
  }

  const exampleOutput = getExampleOutput(formatValue, sequenceValue)

  const handleAddCode = (code: string) => {
    const currentFormat = form.getValues('format')
    form.setValue('format', `${currentFormat}/${code}`)
  }

  return {
    form,
    onSubmit,
    exampleOutput,
    handleAddCode,
    isPending: mutation.isPending,
  }
}

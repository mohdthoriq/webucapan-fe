import { useMemo } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useLocation } from '@tanstack/react-router'
import { toast } from 'sonner'
import {
  cashBankFormSchema,
  type CashBankFormFormData,
} from '../types/cash-bank-form.schema'
import {
  useCreateSpendMoneyMutation,
  useCreateReceiveMoneyMutation,
} from './use-cash-bank-form-mutation'

type UseCashBankFormProps = {
  type: 'spend' | 'receive'
}

export function useCashBankForm({ type }: UseCashBankFormProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as { bank_account_id?: string }

  const defaultValues = useMemo<CashBankFormFormData>(
    () => ({
      bank_account_id: state?.bank_account_id || '',
      date: new Date(),
      description: '',
      contact_id: null,
      reference: '',
      include_tax: false,
      tax_total: 0,
      items: [
        {
          account_id: '',
          amount: 0,
          description: '',
          tax_id: null,
        },
      ],
      withholdings: [],
    }),
    [state?.bank_account_id]
  )

  const form = useForm<CashBankFormFormData>({
    resolver: zodResolver(cashBankFormSchema),
    defaultValues,
  })

  const {
    fields: itemFields,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({
    control: form.control,
    name: 'items',
  })

  const {
    fields: withholdingFields,
    append: appendWithholding,
    remove: removeWithholding,
  } = useFieldArray({
    control: form.control,
    name: 'withholdings',
  })

  const spendMutation = useCreateSpendMoneyMutation()
  const receiveMutation = useCreateReceiveMoneyMutation()

  const isSubmitting = spendMutation.isPending || receiveMutation.isPending

  const onSubmit = async (data: CashBankFormFormData) => {
    try {
      if (type === 'spend') {
        await spendMutation.mutateAsync(data)
      } else {
        await receiveMutation.mutateAsync(data)
      }
      navigate({ to: '/cash-bank' })
    } catch (error) {
      toast.error('Gagal menyimpan data' + error)
    }
  }

  return {
    form,
    itemFields,
    appendItem,
    removeItem,
    withholdingFields,
    appendWithholding,
    removeWithholding,
    onSubmit,
    isSubmitting,
  }
}

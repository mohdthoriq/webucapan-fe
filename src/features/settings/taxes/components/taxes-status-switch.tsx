import type { Tax } from '@/types'
import { Switch } from '@/components/ui/switch'
import { useUpdateTaxMutation } from '../hooks/use-taxes-mutation'

interface TaxStatusSwitchProps {
  tax: Tax
}

export function TaxStatusSwitch({ tax }: TaxStatusSwitchProps) {
  const updateStatus = useUpdateTaxMutation()
  return (
    <div className='flex items-center justify-center px-4'>
      <Switch
        checked={tax.is_active}
        onCheckedChange={(checked) =>
          updateStatus.mutate({
            id: tax.id,
            is_active: checked,
            name: tax.name,
            rate: tax.rate,
            is_withholding: tax.is_withholding,
            buy_account_id: tax.buy_account?.id ?? '',
            sell_account_id: tax.sell_account?.id ?? '',
          })
        }
        disabled={updateStatus.isPending}
      />
    </div>
  )
}

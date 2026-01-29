import { useLocation } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CashBankDetailReceipt } from './components/cash-bank-detail-receipt'
import { useCashBankDetailQuery } from './hooks/use-cash-bank-detail-query'

export function CashBankDetail() {
  const location = useLocation()
  const { currentRowId, accountId } =
    (location.state as { currentRowId?: string; accountId?: string }) || {}

  const { data: transaction, isLoading } = useCashBankDetailQuery({
    transactionId: currentRowId,
    accountId,
  })

  if (isLoading) {
    return (
      <div className='flex h-[60vh] items-center justify-center font-medium'>
        Memuat data transaksi...
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight'>
          Detail Transaksi Cash & Bank
        </h1>
        <Button
          variant='ghost'
          onClick={() => history.back()}
          className='gap-2'
        >
          <ArrowLeft className='h-4 w-4' /> Kembali
        </Button>
      </div>

      <CashBankDetailReceipt transaction={transaction} />
    </div>
  )
}

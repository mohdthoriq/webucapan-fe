import { useLocation } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
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

  if (!transaction) {
    return (
      <Card className='flex h-[60vh] flex-col items-center justify-center gap-4'>
        <CardContent>
          <p className='text-muted-foreground'>
            Data transaksi tidak ditemukan.
          </p>
          <Button onClick={() => history.back()} variant='outline'>
            <ArrowLeft className='mr-2 h-4 w-4' /> Kembali
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <div className='mb-2 flex items-center justify-between'>
            <div>
              <h1 className='text-4xl font-semibold tracking-tight'>
                Detail Transaksi {transaction.entry_number}
              </h1>
            </div>
            <div className='mr-4 flex gap-2'>
              <Button
                variant='ghost'
                onClick={() => history.back()}
                className='gap-2'
              >
                <ArrowLeft className='h-4 w-4' /> Kembali
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className='space-y-6'>
          <CashBankDetailReceipt transaction={transaction} />
        </CardContent>
      </Card>
    </div>
  )
}

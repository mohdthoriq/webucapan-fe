import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { CashBankDetailReceipt } from './components/cash-bank-receipt'
import { useCashBankDetailQuery } from './hooks/use-cash-bank-detail-query'
import { useSearch } from '@tanstack/react-router'

export function CashBankDetail() {
  const search = useSearch({ strict: false }) as Record<string, string>
  // const navigate = useNavigate()

  const transactionId = search.transactionId || search.currentRowId
  const accountId = search.accountId

  const { data: transaction, isLoading } = useCashBankDetailQuery({
    transactionId,
    accountId,
  })

  if (!transactionId || !accountId) {
    return (
      <Card className='flex h-[60vh] flex-col items-center justify-center gap-4'>
        <CardContent className='text-center'>
          <p className='text-muted-foreground'>
            ID Transaksi atau ID Akun tidak ditemukan.
          </p>
          <Button
            onClick={() => window.history.back()}
            variant='outline'
            className='mt-4'
          >
            <ArrowLeft className='mr-2 h-4 w-4' /> Kembali
          </Button>
        </CardContent>
      </Card>
    )
  }

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
                {transaction.transaction_type?.name}
              </h1>
            </div>
            <div className='mr-4 flex gap-2'>
              <Button
                variant='outline'
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

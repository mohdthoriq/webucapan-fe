import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import type { CashBankTransactionDetail } from '../cash-bank-detail/types/cash-bank-detail.types'
import { CashBankPaymentsCard } from './components/cash-bank-payments-card'

interface CashBankEditProps {
  transaction: CashBankTransactionDetail
}

export function CashBankEdit({ transaction }: CashBankEditProps) {
  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <div className='mb-2 flex items-center justify-between'>
            <div>
              <h1 className='text-4xl font-semibold tracking-tight'>
                Ubah Transaksi {transaction.ref_number}
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
          <CashBankPaymentsCard transaction={transaction} />
        </CardContent>
      </Card>
    </div>
  )
}

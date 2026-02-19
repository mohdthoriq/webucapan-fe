import { useLocation } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useExpensesFormQuery } from '../expenses-form/hooks/use-expenses-form-query'
import { ExpensesDetailReceipt } from './components/expenses-detail-receipt'
import { ExpensesPaymentsCard } from './components/expenses-payments-card'
import { TransactionTable } from './components/transaction-table'

export function ExpensesDetail() {
  const location = useLocation()
  const currentRowId = (location.state as { currentRowId?: string })
    ?.currentRowId

  const { data: expense, isLoading } = useExpensesFormQuery({
    id: currentRowId,
  })

  if (isLoading) {
    return (
      <div className='flex h-[60vh] items-center justify-center font-medium'>
        Memuat data expenses...
      </div>
    )
  }

  if (!expense) {
    return (
      <Card className='flex h-[60vh] flex-col items-center justify-center gap-4'>
        <CardContent>
          <p className='text-muted-foreground'>
            Data expenses tidak ditemukan.
          </p>
          <Button onClick={() => history.back()} variant='outline'>
            <ArrowLeft className='mr-2 h-4 w-4' /> Kembali
          </Button>
        </CardContent>
      </Card>
    )
  }

  const showTransactionTable =
    expense.payment_status === 'paid' ||
    expense.payment_status === 'partially_paid'

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <div className='mb-2 flex items-center justify-between'>
            <div>
              <h1 className='text-4xl font-semibold tracking-tight'>
                Detail Biaya {expense.expense_number}
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
          <ExpensesDetailReceipt expense={expense} />
          <ExpensesPaymentsCard expense={expense} />

          {showTransactionTable && (
            <TransactionTable
              payments={expense.payments}
              currency={expense.currency}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

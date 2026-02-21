import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { TransactionTypesProvider, useTransactionTypes } from './components/transaction-types-provider'
import { TransactionTypesTable } from './components/transaction-types-table'
import { TransactionTypesDialogs } from './components/transaction-types-dialogs'

function TransactionTypesContent() {
  const { setOpen } = useTransactionTypes()

  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between'>
          <div className='mb-2 grid'>
            <h2 className='text-2xl font-bold tracking-tight'>Tipe Transaksi</h2>
            <p className='text-muted-foreground'>
              Kelola Tipe Transaksi di sini.
            </p>
          </div>
          <div className='flex flex-col items-end gap-2 md:flex-row md:items-start'>
            <Button variant='link' onClick={() => history.go(-1)}>
              Kembali
            </Button>
            <Button onClick={() => setOpen('add')}>
              <Plus className='mr-2 h-4 w-4' />
              Tambah Tipe Transaksi
            </Button>
          </div>
        </div>
        <hr />
      </CardHeader>
      <CardContent>
        <TransactionTypesTable />
        <TransactionTypesDialogs />
      </CardContent>
    </Card>
  )
}

function TransactionTypes() {
  return (
    <TransactionTypesProvider>
      <TransactionTypesContent />
    </TransactionTypesProvider>
  )
}

export default TransactionTypes

import type { CashBankOverview } from '@/types'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useCashBankOverviewQuery } from './hooks/use-cash-bank-list-query'
import { AccountChartCard } from './pages/account-chart-card'

export default function CashBankOverviewPage() {
  const { data, isLoading } = useCashBankOverviewQuery()

  return (
    <Card className='flex flex-col gap-6 p-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Kas & Bank</h1>
          <p className='text-muted-foreground'>
            Kelola saldo dan transaksi kas serta rekening bank Anda.
          </p>
        </div>
        <Button className='flex items-center gap-2'>
          <Plus className='h-4 w-4' />
          Tambah Akun
        </Button>
      </div>

      <div className='grid grid-cols-1 gap-6'>
        {isLoading ? (
          <div className='flex h-64 items-center justify-center'>
            <div className='border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent' />
          </div>
        ) : data ? (
          Array.isArray(data) ? (
            data.map((account: CashBankOverview, index: number) => (
              <AccountChartCard key={index} data={account} />
            ))
          ) : (
            <AccountChartCard data={data} />
          )
        ) : (
          <div className='flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-50 p-12'>
            <p>Tidak ada data kas & bank ditemukan.</p>
          </div>
        )}
      </div>
    </Card>
  )
}

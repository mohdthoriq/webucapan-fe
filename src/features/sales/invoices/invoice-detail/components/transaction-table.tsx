import { format } from 'date-fns'
import type { Payment } from '@/types'
import { id } from 'date-fns/locale'
import { formatCurrency } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface TransactionTableProps {
  payments: Payment[]
  currency: string
}

export function TransactionTable({
  payments,
  currency,
}: TransactionTableProps) {
  if (!payments || payments.length === 0) return null

  return (
    <Card className='overflow-hidden'>
      <CardHeader>
        <CardTitle className='text-lg font-semibold'>
          Riwayat Transaksi
        </CardTitle>
      </CardHeader>
      <hr />
      <CardContent className='pt-2'>
        <div className='rounded-xl border'>
          <Table>
            <TableHeader>
              <TableRow className='bg-muted/50 hover:transparent'>
                <TableHead className='w-[100px] p-4'>Tanggal</TableHead>
                <TableHead className='p-4'>Nomor</TableHead>
                <TableHead className='p-4'>Referensi</TableHead>
                <TableHead className='p-4'>Akun</TableHead>
                <TableHead className='p-4 text-right'>Jumlah</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow
                  key={payment.id}
                  className='hover:bg-muted/30 transition-colors'
                >
                  <TableCell className='p-4 font-medium'>
                    {format(new Date(payment.payment_date), 'dd MMMM yyyy', {
                      locale: id,
                    })}
                  </TableCell>
                  <TableCell className='text-primary cursor-pointer p-4 hover:underline'>
                    {payment.reference_no || '-'}
                  </TableCell>
                  <TableCell className='text-primary cursor-pointer p-4 hover:underline'>
                    {payment.note || '-'}
                  </TableCell>
                  <TableCell className='p-4'>
                    <span className='font-medium'>
                      {payment.account.name.replace('_', ' ')}
                    </span>
                  </TableCell>
                  <TableCell className='p-4 text-right font-semibold'>
                    {formatCurrency(payment.amount, currency)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

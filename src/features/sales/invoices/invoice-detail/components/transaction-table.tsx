import { format } from 'date-fns'
import type { InvoicePayment } from '@/types'
import { id } from 'date-fns/locale'
import { formatCurrency } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface TransactionTableProps {
  payments: InvoicePayment[]
  currency: string
}

export function TransactionTable({
  payments,
  currency,
}: TransactionTableProps) {
  if (!payments || payments.length === 0) return null

  return (
    <div className='mt-8 space-y-4'>
      <h3 className='text-lg font-semibold'>Riwayat Transaksi</h3>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tanggal</TableHead>
              <TableHead>No. Referensi</TableHead>
              <TableHead>Akun</TableHead>
              <TableHead>Metode</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='text-right'>Jumlah</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>
                  {format(new Date(payment.payment_date), 'dd MMMM yyyy', {
                    locale: id,
                  })}
                </TableCell>
                <TableCell>{payment.reference_no || '-'}</TableCell>
                <TableCell>{payment.account?.name}</TableCell>
                <TableCell className='capitalize'>
                  {payment.method.replace('_', ' ')}
                </TableCell>
                <TableCell>
                  <Badge variant='outline' className='capitalize'>
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell className='text-right font-medium'>
                  {formatCurrency(payment.amount, currency)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

import { format } from 'date-fns'
import { type ExpensePayment } from '@/types/domain/expenses'
import { id } from 'date-fns/locale'
import { formatCurrency } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
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
  payments: ExpensePayment[]
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
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow className='bg-muted/50'>
                <TableHead className='w-[100px] p-4'>Tanggal</TableHead>
                <TableHead className='p-4'>No. Referensi</TableHead>
                <TableHead className='p-4'>Akun</TableHead>
                <TableHead className='p-4'>Metode</TableHead>
                <TableHead className='p-4'>Status</TableHead>
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
                  <TableCell className='text-muted-foreground p-4'>
                    {payment.reference_no || '-'}
                  </TableCell>
                  <TableCell className='p-4'>{payment.account?.name}</TableCell>
                  <TableCell className='p-4 capitalize'>
                    <span className='bg-secondary text-secondary-foreground inline-flex items-center rounded px-2 py-0.5 text-xs font-medium'>
                      {payment.method.replace('_', ' ')}
                    </span>
                  </TableCell>
                  <TableCell className='p-4'>
                    <Badge variant='outline' className='font-normal capitalize'>
                      {payment.status}
                    </Badge>
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

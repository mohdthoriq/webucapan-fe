import { format } from 'date-fns'
import { useNavigate } from '@tanstack/react-router'
import { type Payment } from '@/types'
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
  const navigate = useNavigate()

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
              <TableRow className='bg-muted/80 hover:bg-transparent'>
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
                  onClick={() =>
                    navigate({
                      to: '/cash-bank/detail',
                      search: {
                        accountId: payment.account.id,
                        transactionId: payment.id,
                      },
                    })
                  }
                >
                  <TableCell className='p-4 font-medium'>
                    {format(new Date(payment.payment_date), 'dd MMMM yyyy', {
                      locale: id,
                    })}
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      navigate({
                        to: '/cash-bank/detail',
                        search: {
                          accountId: payment.account.id,
                          transactionId: payment.id,
                        },
                      })
                    }
                    className='text-muted-foreground p-4'
                  >
                    {payment.reference_no || '-'}
                  </TableCell>
                  <TableCell className='text-primary cursor-pointer p-4 hover:underline'>
                    {payment.note}
                  </TableCell>
                  <TableCell className='p-4 capitalize'>
                    <span className='font-medium'>{payment.account?.name}</span>
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

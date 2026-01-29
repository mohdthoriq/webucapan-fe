import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { Printer, User, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import { formatCurrency, cn, getStatusStyles } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { CashBankTransactionDetail } from '../types/cash-bank-detail.types'

interface CashBankDetailReceiptProps {
  transaction: CashBankTransactionDetail | null | undefined
}

export function CashBankDetailReceipt({
  transaction,
}: CashBankDetailReceiptProps) {
  const isReconciled = transaction?.status === 'reconciled'

  return (
    <Card className='overflow-hidden shadow-md print:border print:shadow-none'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-3'>
            <Badge
              variant={'outline'}
              className='bg-primary/10 text-primary py-1.5 text-xs font-medium tracking-wider uppercase'
            >
              {transaction?.transaction_type}
            </Badge>
            <CardTitle className='text-primary flex items-center gap-4 text-2xl font-bold tracking-tight'>
              {transaction?.transaction_title}
            </CardTitle>
            <div className='text-muted-foreground flex items-center gap-2 text-sm'>
              <span>No. Entri: {transaction?.entry_number}</span>
              <span>•</span>
              <Badge
                variant='outline'
                className={cn(
                  'px-2 py-1 text-[10px] font-bold tracking-widest uppercase',
                  getStatusStyles(transaction?.status as string)
                )}
              >
                {transaction?.status}
              </Badge>
            </div>
          </div>
          <div className='flex gap-2 print:hidden'>
            <Button
              variant='outline'
              size='sm'
              className='gap-2 shadow-sm'
              onClick={() => window.print()}
            >
              <Printer className='h-4 w-4' /> Cetak
            </Button>
          </div>
        </div>
      </CardHeader>
      <hr />

      <CardContent className='space-y-8 pt-6'>
        {/* Header Info */}
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          <div className='space-y-2'>
            <p className='text-muted-foreground text-[12px] font-semibold tracking-[0.2em] uppercase'>
              Akun Kas&Bank
            </p>
            <div className='flex items-center gap-2'>
              <span className='text-md font-semibold'>
                {transaction?.account_name}
              </span>
              {'-'}
              <span className='text-muted-foreground text-md'>
                {transaction?.account_code}
              </span>
            </div>
          </div>

          <div className='space-y-2'>
            <p className='text-muted-foreground text-[12px] font-semibold tracking-[0.2em] uppercase'>
              Tanggal & Referensi
            </p>
            <p className='text-md font-semibold'>
              {transaction?.date
                ? format(new Date(transaction.date), 'dd MMMM yyyy', {
                    locale: id,
                  })
                : '-'}
            </p>
            <p className='text-muted-foreground text-md'>
              Ref: {transaction?.reference || '-'}
            </p>
          </div>

          <div className='space-y-2'>
            <p className='text-muted-foreground text-[12px] font-semibold tracking-[0.2em] uppercase'>
              Kontak
            </p>
            <p className='text-md font-semibold'>
              {transaction?.contact_name || '-'}
            </p>
          </div>

          <div className='space-y-2'>
            <p className='text-muted-foreground text-[12px] font-semibold tracking-[0.2em] uppercase'>
              Status Rekonsiliasi
            </p>
            <div className='flex items-center gap-1.5'>
              {isReconciled ? (
                <CheckCircle2 className='h-4 w-4 text-green-500' />
              ) : (
                <AlertCircle className='h-4 w-4 text-amber-500' />
              )}
              <span
                className={cn(
                  'text-md font-medium capitalize',
                  isReconciled ? 'text-green-600' : 'text-amber-600'
                )}
              >
                {transaction?.status}
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Journal Lines Table */}
        <div className='space-y-4'>
          <h4 className='text-muted-foreground text-md font-bold tracking-wider uppercase'>
            Rincian Jurnal
          </h4>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow className='bg-muted/50'>
                  <TableHead className='w-[150px] p-4'>Kode</TableHead>
                  <TableHead className='w-[150px] p-4'>Akun</TableHead>
                  <TableHead className='p-4'>Deskripsi</TableHead>
                  <TableHead className='w-[120px] p-4 text-right'>
                    Debit
                  </TableHead>
                  <TableHead className='w-[120px] p-4 text-right'>
                    Kredit
                  </TableHead>
                  <TableHead className='w-[120px] p-4 text-right'>
                    Total
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transaction?.lines?.map((line) => (
                  <TableRow key={line.id}>
                    <TableCell className='p-4 font-medium'>
                      {line.account_code}
                    </TableCell>
                    <TableCell className='p-4'>
                      <div className='flex flex-col'>
                        <span className='font-medium'>{line.account_name}</span>
                      </div>
                    </TableCell>
                    <TableCell className='p-4'>
                      {line.description ? (
                        <span className='text-muted-foreground text-xs'>
                          {line.description}
                        </span>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell className='p-4 text-right'>
                      {line.debit > 0 ? formatCurrency(line.debit) : '-'}
                    </TableCell>
                    <TableCell className='p-4 text-right'>
                      {line.credit > 0 ? formatCurrency(line.credit) : '-'}
                    </TableCell>
                    <TableCell className='p-4 text-right'>
                      {line.amount > 0 ? formatCurrency(line.amount) : '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Footer: Description & Totals */}
        <div className='flex flex-col gap-8 md:flex-row'>
          <div className='flex-1 space-y-8'>
            {transaction?.description && (
              <Card className='bg-muted/30 rounded-lg border-none p-4'>
                <p className='text-muted-foreground text-[10px] font-bold tracking-widest uppercase'>
                  Catatan / Deskripsi
                </p>
                <p className='text-md italic'>{transaction.description}</p>
              </Card>
            )}

            {/* Audit Trail */}
            <div className='text-muted-foreground grid grid-cols-2 gap-4 text-[10px] tracking-widest uppercase'>
              <div className='flex flex-col gap-3'>
                <div className='flex items-center gap-2'>
                  <User className='h-3 w-3' />
                  <span>Dibuat: {transaction?.audit?.created_by}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Clock className='h-3 w-3' />
                  <span>
                    {transaction?.audit?.created_at
                      ? format(
                          new Date(transaction.audit.created_at),
                          'dd/MM/yyyy HH:mm'
                        )
                      : '-'}
                  </span>
                </div>
              </div>
              <div className='flex flex-col gap-3 border-l pl-4'>
                <div className='flex items-center gap-2'>
                  <User className='h-3 w-3' />
                  <span>Diubah: {transaction?.audit?.updated_by}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Clock className='h-3 w-3' />
                  <span>
                    {transaction?.audit?.updated_at
                      ? format(
                          new Date(transaction.audit.updated_at),
                          'dd/MM/yyyy HH:mm'
                        )
                      : '-'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='w-full md:w-80'>
            <div className='bg-muted/30 space-y-3 rounded-lg p-6'>
              <div className='flex justify-between text-sm'>
                <span className='text-muted-foreground text-lg font-medium'>
                  Total :
                </span>
                <span className='text-lg font-medium'>
                  {formatCurrency(transaction?.total as number)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

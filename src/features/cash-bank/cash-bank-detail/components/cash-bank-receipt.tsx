import { format } from 'date-fns'
import { type LinkProps, useNavigate } from '@tanstack/react-router'
import { id } from 'date-fns/locale'
import { Printer } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
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
import { CashBankRowActions } from './cash-bank-row-actions'

interface CashBankDetailReceiptProps {
  transaction: CashBankTransactionDetail | null | undefined
}

enum TransactionType {
  SalesInvoice = 'SalesInvoice',
  PurchaseInvoice = 'PurchaseInvoice',
  Expense = 'Expense',
  BankTransfer = 'bank_transfer',
  SpendMoney = 'spend_money',
  ReceiveMoney = 'receive_money',
}

export function CashBankDetailReceipt({
  transaction,
}: CashBankDetailReceiptProps) {
  const navigate = useNavigate()

  const url: LinkProps['to'] =
    transaction?.source_type === TransactionType.SalesInvoice
      ? `/sales/invoices/detail`
      : transaction?.source_type === TransactionType.PurchaseInvoice
        ? `/purchases/invoices/detail`
        : `/expenses/detail`

  return (
    <Card className='gap-3 overflow-hidden py-4 shadow-md'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-3'>
            <CardTitle
              onClick={() =>
                navigate({
                  to: url,
                  state: {
                    currentRowId: transaction?.source_id,
                  } as Record<string, unknown>,
                })
              }
              className='text-primary flex cursor-pointer items-center gap-4 text-2xl font-bold tracking-tight'
            >
              {transaction?.transaction_title}
            </CardTitle>
          </div>
          <div className='flex gap-2'>
            <Button
              variant='outline'
              size='sm'
              className='gap-2 shadow-sm'
              onClick={() => window.print()}
            >
              <Printer className='h-4 w-4' /> Cetak
            </Button>
            <CashBankRowActions
              transaction={transaction as CashBankTransactionDetail}
            />
          </div>
        </div>
      </CardHeader>
      <hr />

      <CardContent className='space-y-8 pt-6'>
        {/* Header Info */}
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          <div className='flex flex-col gap-6'>
            <div className='space-y-2'>
              <p className='text-muted-foreground text-sm font-semibold'>
                Akun
              </p>
              <div className='flex items-center gap-2'>
                <span className='text-md font-semibold'>
                  {transaction?.account_code}
                </span>
                {'-'}
                <span className='text-md font-semibold'>
                  {transaction?.account_name}
                </span>
              </div>
            </div>
            <div className='space-y-2'>
              <p className='text-muted-foreground text-[12px] font-semibold tracking-[0.2em] uppercase'>
                Tanggal Transaksi
              </p>
              <p className='text-md font-semibold'>
                {transaction?.date
                  ? format(new Date(transaction.date), 'dd MMMM yyyy', {
                      locale: id,
                    })
                  : '-'}
              </p>
            </div>
            <div className='space-y-2'>
              <p className='text-muted-foreground text-[12px] font-semibold tracking-[0.2em] uppercase'>
                Referensi
              </p>
              <p className='text-md font-semibold'>
                {transaction?.reference || '-'}
              </p>
            </div>
          </div>

          <div className='flex flex-col gap-6'>
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
                Tag
              </p>
              <div className='flex flex-wrap gap-2'>
                {transaction?.tags && transaction.tags.length > 0 ? (
                  transaction.tags.map((tag, index) => {
                    const tagName = typeof tag === 'object' ? tag.name : tag
                    return (
                      <Badge
                        key={index}
                        variant='outline'
                        className='px-2 py-1 text-[10px]'
                      >
                        {tagName}
                      </Badge>
                    )
                  })
                ) : (
                  <span className='text-md font-semibold'>-</span>
                )}
              </div>
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
        <div className='flex flex-col gap-8 md:flex-row md:justify-end'>
          <div className='w-full rounded-sm border md:w-80'>
            <div className='bg-muted space-y-3 rounded-lg p-6'>
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

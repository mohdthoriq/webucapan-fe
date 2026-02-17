import { format } from 'date-fns'
import type { Expense } from '@/types/domain/expenses'
import { id } from 'date-fns/locale'
import { Building2, Printer, Mail, Phone, MapPin, Loader2 } from 'lucide-react'
import { formatCurrency, cn, getStatusStyles, invoiceLabel } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { usePrintExpensesQuery } from '../hooks/use-print-expenses-invoice-query'
import { ExpenseDetailRowActions } from './expenses-detail-row-actions'

interface ExpensesDetailReceiptProps {
  expense: Expense
}

export function ExpensesDetailReceipt({ expense }: ExpensesDetailReceiptProps) {
  const { refetch, isFetching: isPrinting } = usePrintExpensesQuery(expense.id)

  const handlePrint = async () => {
    const { data } = await refetch()
    if (data) {
      window.open(data, '_blank')
    }
  }

  return (
    <Card className='gap-3 overflow-hidden py-4 shadow-md'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-1'>
            <CardTitle className='flex items-center gap-4 text-2xl font-bold tracking-tight'>
              # {expense.expense_number}
              <Badge
                variant='outline'
                className={cn(
                  'text-[12 px] w-fit px-2 py-1 font-bold tracking-wider uppercase',
                  getStatusStyles(expense.payment_status)
                )}
              >
                {invoiceLabel[expense.payment_status] || expense.payment_status}
              </Badge>
            </CardTitle>
          </div>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              className='gap-2 shadow-sm'
              onClick={handlePrint}
              disabled={isPrinting}
            >
              {isPrinting ? (
                <Loader2 className='h-4 w-4 animate-spin' />
              ) : (
                <Printer className='h-4 w-4' />
              )}
              {isPrinting ? 'Memproses...' : 'Cetak Struk'}
            </Button>
            <ExpenseDetailRowActions expense={expense} />
          </div>
        </div>
      </CardHeader>
      <hr />

      <CardContent>
        <div className='mb-10 grid grid-cols-1 gap-10 px-2 py-4 md:grid-cols-2 lg:grid-cols-3'>
          <div className='space-y-4'>
            <p className='mb-3 text-sm font-bold tracking-widest'>Penerima :</p>
            <div className='space-y-4'>
              <div>
                <p className='text-primary mb-2 text-lg font-bold'>
                  {expense.contact?.name}
                </p>
                <div className='flex items-center gap-2'>
                  <Building2 className='text-muted-foreground h-4 w-4' />
                  <p className='text-muted-foreground text-sm'>
                    {expense.company?.name || '-'}
                  </p>
                </div>
              </div>

              <div className='space-y-3'>
                <div className='flex items-center gap-2'>
                  <Mail className='text-muted-foreground h-4 w-4' />
                  <p className='text-muted-foreground text-sm'>
                    {expense.contact?.email || '-'}
                  </p>
                </div>
                <div className='flex items-center gap-2'>
                  <Phone className='text-muted-foreground h-4 w-4' />
                  <p className='text-muted-foreground text-sm'>
                    {expense.contact?.phone || '-'}
                  </p>
                </div>
                <div className='flex items-start gap-2 pt-1'>
                  <MapPin className='text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0' />
                  <p className='text-muted-foreground max-w-xs text-sm leading-relaxed'>
                    {expense.contact?.address || '-'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='space-y-4'>
            <div>
              <p className='mb-3 text-sm font-bold tracking-widest'>
                Nomor Biaya :
              </p>
              <p className='text-primary text-md font-semibold'>
                {expense.expense_number || '-'}
              </p>
            </div>
            <div>
              <p className='mb-3 text-sm font-bold tracking-widest'>
                Detail Waktu :
              </p>
              <div className='space-y-3'>
                <div className='flex items-baseline gap-3'>
                  <span className='text-muted-foreground w-32 text-sm'>
                    Tanggal Biaya:
                  </span>
                  <span className='text-primary text-sm font-semibold'>
                    {format(new Date(expense.date), 'dd MMMM yyyy', {
                      locale: id,
                    })}
                  </span>
                </div>
                <div className='flex items-baseline gap-3'>
                  <span className='text-muted-foreground w-32 text-sm'>
                    Jatuh Tempo:
                  </span>
                  <span className='text-primary text-sm font-semibold'>
                    {format(
                      new Date(expense.due_date as Date),
                      'dd MMMM yyyy',
                      {
                        locale: id,
                      }
                    )}
                  </span>
                </div>
                <div className='flex items-baseline gap-3'>
                  <span className='text-muted-foreground w-32 text-sm'>
                    Termin Pembayaran:
                  </span>
                  <span className='text-primary text-sm font-semibold'>
                    {expense.payment_term?.name || '-'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='space-y-1'>
            <div>
              <p className='mb-3 text-sm font-bold tracking-widest'>Tag</p>
              <div className='flex flex-wrap gap-2'>
                {expense.tags && expense.tags.length > 0 ? (
                  expense.tags.map((tag, idx) => (
                    <Badge
                      key={idx}
                      variant='outline'
                      className='px-2 py-1 text-[12px] font-semibold uppercase'
                    >
                      {typeof tag === 'object' ? tag.name : tag}
                    </Badge>
                  ))
                ) : (
                  <span className='text-muted-foreground text-sm'>-</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <Separator className='mb-8' />

        {/* Expense Items List */}
        <div className='mb-8 flex flex-col'>
          {expense.expense_items.map((item, _) => (
            <div key={item.id} className='flex flex-col border-b py-4'>
              <div className='flex items-center justify-between'>
                <span className='font-medium text-blue-500'>
                  {item.account?.code
                    ? item.account?.code + '-' + item.account?.name
                    : item.account?.name}
                </span>
                <span className='text-base font-bold'>
                  {formatCurrency(Number(item.amount), expense.currency)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Totals Section */}
        <div className='mt-10 flex flex-col items-start justify-between gap-8 md:flex-row'>
          <div className='hidden flex-1 md:block'></div>
          <div className='bg-muted/30 w-full space-y-3 rounded-lg p-6 md:w-120'>
            <div className='flex justify-between text-sm'>
              <span className='text-muted-foreground'>Subtotal</span>
              <span className='font-medium'>
                {formatCurrency(Number(expense.subtotal), expense.currency)}
              </span>
            </div>

            {/* Tax Breakdown */}
            {Object.entries(
              expense.expense_items.reduce(
                (acc, item) => {
                  if (item.tax) {
                    const taxName = item.tax.name
                    const amount = Number(item.amount) || 0
                    const taxAmount = (amount * (item.tax.rate || 0)) / 100

                    acc[taxName] = (acc[taxName] || 0) + taxAmount
                  }
                  return acc
                },
                {} as Record<string, number>
              )
            ).map(([name, amount]) => (
              <div key={name} className='flex justify-between text-sm'>
                <span className='text-muted-foreground'>{name}</span>
                <span className='font-medium'>
                  {formatCurrency(amount, expense.currency)}
                </span>
              </div>
            ))}

            {/* Fallback if no specific tax items but a total exists */}
            {expense.expense_items.every((item) => !item.tax) &&
              Number(expense.tax_total) > 0 && (
                <div className='flex justify-between text-sm font-medium'>
                  <span className='text-muted-foreground'>Pajak</span>
                  <span>
                    {formatCurrency(
                      Number(expense.tax_total),
                      expense.currency
                    )}
                  </span>
                </div>
              )}

            <div className='flex justify-between text-sm'>
              <span className='text-muted-foreground'>Total</span>
              <span className='font-medium'>
                {formatCurrency(Number(expense.total), expense.currency)}
              </span>
            </div>

            <Separator className='my-2 bg-zinc-300 dark:bg-zinc-700' />
            <div className='flex items-center justify-between'>
              <span className='text-base font-bold'>Sisa Tagihan</span>
              <span className='text-primary text-2xl font-black'>
                {formatCurrency(Number(expense.outstanding), expense.currency)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

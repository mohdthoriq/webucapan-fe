import { format } from 'date-fns'
import type { SalesInvoice } from '@/types'
import { id } from 'date-fns/locale'
import { Building2, Printer, Mail, Phone, MapPin, Loader2 } from 'lucide-react'
import { formatCurrency, cn, getStatusStyles, invoiceLabel } from '@/lib/utils'
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
import { usePrintSalesInvoiceQuery } from '../hooks/use-print-sales-invoice-query'
import { InvoiceDetailRowActions } from './invoice-detail-row-actions'

interface InvoiceDetailReceiptProps {
  invoice: SalesInvoice
}

export function InvoiceDetailReceipt({ invoice }: InvoiceDetailReceiptProps) {
  const { refetch, isFetching: isPrinting } = usePrintSalesInvoiceQuery(
    invoice.id
  )

  const handlePrint = async () => {
    const { data } = await refetch()
    if (data) {
      window.open(data, '_blank')
    }
  }

  return (
    <Card className='gap-3 overflow-hidden py-4 shadow-md'>
      <CardHeader className='py-0'>
        <div className='flex items-center justify-between'>
          <CardTitle className='flex items-center gap-4 text-2xl font-bold tracking-tight'>
            # {invoice.invoice_number}
            <Badge
              variant='outline'
              className={cn(
                'text-[12 px] w-fit px-2 py-1 font-bold tracking-wider uppercase',
                getStatusStyles(invoice.payment_status)
              )}
            >
              {invoiceLabel[invoice.payment_status] || invoice.payment_status}
            </Badge>
          </CardTitle>
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
            <InvoiceDetailRowActions invoice={invoice} />
          </div>
        </div>
      </CardHeader>
      <hr />
      <CardContent>
        <div className='mb-10 grid grid-cols-1 gap-10 px-2 py-4 md:grid-cols-2 lg:grid-cols-3'>
          <div className='space-y-4'>
            <p className='mb-3 text-sm font-bold tracking-widest'>
              Pelanggan :
            </p>
            <div className='space-y-4'>
              <div>
                <p className='text-primary mb-2 text-lg font-bold'>
                  {invoice.customer?.name}
                </p>
                <div className='flex items-center gap-2'>
                  <Building2 className='text-muted-foreground h-4 w-4' />
                  <p className='text-muted-foreground text-sm'>
                    {invoice.company?.name || '-'}
                  </p>
                </div>
              </div>

              <div className='space-y-3'>
                <div className='flex items-center gap-2'>
                  <Mail className='text-muted-foreground h-4 w-4' />
                  <p className='text-muted-foreground text-sm'>
                    {invoice.customer?.email || '-'}
                  </p>
                </div>
                <div className='flex items-center gap-2'>
                  <Phone className='text-muted-foreground h-4 w-4' />
                  <p className='text-muted-foreground text-sm'>
                    {invoice.customer?.phone || '-'}
                  </p>
                </div>
                <div className='flex items-start gap-2 pt-1'>
                  <MapPin className='text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0' />
                  <p className='text-muted-foreground max-w-xs text-sm leading-relaxed'>
                    {invoice.customer?.address || '-'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='space-y-4'>
            <div>
              <p className='mb-3 text-sm font-bold tracking-widest'>
                Nomor Invoice :
              </p>
              <p className='text-primary text-md font-semibold'>
                {invoice.invoice_number || '-'}
              </p>
            </div>
            <div>
              <p className='mb-3 text-sm font-bold tracking-widest'>
                Detail Waktu :
              </p>
              <div className='space-y-3'>
                <div className='flex items-baseline gap-3'>
                  <span className='text-muted-foreground w-32 text-sm'>
                    Tanggal Invoice:
                  </span>
                  <span className='text-primary text-sm font-semibold'>
                    {format(new Date(invoice.invoice_date), 'dd MMMM yyyy', {
                      locale: id,
                    })}
                  </span>
                </div>
                <div className='flex items-baseline gap-3'>
                  <span className='text-muted-foreground w-32 text-sm'>
                    Jatuh Tempo:
                  </span>
                  <span className='text-primary text-sm font-semibold'>
                    {format(new Date(invoice.due_date), 'dd MMMM yyyy', {
                      locale: id,
                    })}
                  </span>
                </div>
                <div className='flex items-baseline gap-3'>
                  <span className='text-muted-foreground w-32 text-sm'>
                    Termin Pembayaran:
                  </span>
                  <span className='text-primary text-sm font-semibold'>
                    {invoice.payment_term?.name || '-'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='space-y-1'>
            <div>
              <p className='mb-3 text-sm font-bold tracking-widest'>Tag</p>
              <div className='flex flex-wrap gap-2'>
                {invoice.tags && invoice.tags.length > 0 ? (
                  invoice.tags.map((tag, idx) => (
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

        {/* Invoice Items */}
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow className='bg-muted hover:bg-transparent'>
                <TableHead className='text-muted-foreground h-10 p-4 font-semibold tracking-wider uppercase'>
                  Item
                </TableHead>
                <TableHead className='text-muted-foreground h-10 p-4 font-semibold tracking-wider uppercase'>
                  Deskripsi
                </TableHead>
                <TableHead className='text-muted-foreground h-10 p-4 font-semibold tracking-wider uppercase'>
                  Harga
                </TableHead>
                <TableHead className='text-muted-foreground h-10 p-4 text-center font-semibold tracking-wider uppercase'>
                  Qty
                </TableHead>
                <TableHead className='text-muted-foreground h-10 p-4 font-semibold tracking-wider uppercase'>
                  Discount
                </TableHead>
                <TableHead className='text-muted-foreground h-10 p-4 font-semibold tracking-wider uppercase'>
                  Pajak
                </TableHead>
                <TableHead className='text-muted-foreground h-10 p-4 text-right font-semibold tracking-wider uppercase'>
                  Total Harga
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.sales_invoice_items.map((item, idx) => (
                <TableRow
                  key={idx}
                  className='hover:bg-muted/80 transition-colors'
                >
                  <TableCell className='p-4 align-top'>
                    <p className='text-primary cursor-pointer font-semibold hover:underline'>
                      {item.product?.name || '-'}
                    </p>
                  </TableCell>
                  <TableCell className='p-4 align-top'>
                    <p className='font-semibold'>{item.description || '-'}</p>
                  </TableCell>
                  <TableCell className='p-4 align-top'>
                    <p className='text-sm font-medium'>
                      {formatCurrency(
                        Number(item.unit_price),
                        invoice.currency
                      )}
                    </p>
                  </TableCell>
                  <TableCell className='p-4 text-center align-top'>
                    <p className='text-sm font-medium'>
                      {item.quantity || '-'}
                    </p>
                  </TableCell>
                  <TableCell className='p-4 align-top'>
                    <p className='text-sm font-medium'>
                      {item.discount ? item.discount + '%' : '-'}
                    </p>
                  </TableCell>
                  <TableCell className='p-4 align-top'>
                    <p className='text-sm font-medium'>
                      {item.tax?.name ?? '-'}
                    </p>
                  </TableCell>
                  <TableCell className='p-4 text-right align-top'>
                    <p className='text-sm font-bold'>
                      {formatCurrency(
                        Number(item.line_total),
                        invoice.currency
                      )}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className='mt-10 flex flex-col items-start justify-between gap-8 md:flex-row'>
          <div className='hidden flex-1 md:block'>
            {/* Space for notes or signatures if needed */}
          </div>

          <div className='bg-muted/30 w-full space-y-3 rounded-lg p-6 md:w-120'>
            <div className='flex justify-between border-b pb-2 text-sm'>
              <span className='text-muted-foreground'>Subtotal</span>
              <span className='font-medium'>
                {formatCurrency(Number(invoice.subtotal), invoice.currency)}
              </span>
            </div>

            {/* Tax Breakdown */}
            {Object.entries(
              invoice.sales_invoice_items.reduce(
                (acc, item) => {
                  if (item.tax) {
                    const taxName = item.tax.name
                    const quantity = Number(item.quantity) || 0
                    const unitPrice = Number(item.unit_price) || 0
                    const taxAmount =
                      (quantity * unitPrice * (item.tax.rate || 0)) / 100

                    acc[taxName] = (acc[taxName] || 0) + taxAmount
                  }
                  return acc
                },
                {} as Record<string, number>
              )
            ).map(([name, amount]) => (
              <div
                key={name}
                className='flex justify-between border-b pb-2 text-sm'
              >
                <span className='text-muted-foreground'>{name}</span>
                <span className='font-medium'>
                  {formatCurrency(amount, invoice.currency)}
                </span>
              </div>
            ))}

            {/* Fallback if no specific tax items but a total exists */}
            {invoice.sales_invoice_items.every((item) => !item.tax) &&
              Number(invoice.tax_total) > 0 && (
                <div className='flex justify-between border-b pb-2 text-sm font-medium'>
                  <span className='text-muted-foreground'>Pajak</span>
                  <span>
                    {formatCurrency(
                      Number(invoice.tax_total),
                      invoice.currency
                    )}
                  </span>
                </div>
              )}

            <div className='flex justify-between border-b pb-2 text-sm'>
              <span className='text-lg font-medium'>Total</span>
              <span className='text-lg font-medium'>
                {formatCurrency(Number(invoice.total), invoice.currency)}
              </span>
            </div>

            {invoice.payments?.map((payment) => (
              <div
                key={payment.id}
                className='text-primary flex cursor-pointer justify-between border-b pb-2 text-sm font-medium hover:underline'
              >
                <span>Pembayaran {payment.account.name}</span>
                <span>
                  {formatCurrency(Number(payment.amount), invoice.currency)}
                </span>
              </div>
            ))}
            <div className='flex items-center justify-between'>
              <span className='text-lg font-bold'>Sisa Tagihan</span>
              <span className='text-primary text-2xl font-black'>
                {formatCurrency(Number(invoice.outstanding), invoice.currency)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

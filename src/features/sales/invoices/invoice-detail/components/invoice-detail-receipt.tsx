import { format } from 'date-fns'
import type { SalesInvoice } from '@/types'
import { id } from 'date-fns/locale'
import { Printer } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
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

interface InvoiceDetailReceiptProps {
  invoice: SalesInvoice
}

export function InvoiceDetailReceipt({ invoice }: InvoiceDetailReceiptProps) {
  return (
    <Card className='overflow-hidden shadow-md print:border print:shadow-none'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-1xl'>{invoice.status}</CardTitle>
          <Button
            variant='outline'
            className='gap-2'
            onClick={() => window.print()}
          >
            <Printer className='h-4 w-4' /> Cetak Struk
          </Button>
        </div>
      </CardHeader>
      <hr />
      <CardContent>
        <div className='mb-10 grid grid-cols-1 gap-10 md:grid-cols-2'>
          <div className='space-y-4'>
            <div>
              <p className='text-muted-foreground mb-1 text-[10px] font-bold tracking-[0.2em] uppercase'>
                Tagihan Untuk
              </p>
              <p className='text-lg font-bold'>{invoice.customer?.name}</p>
              <p className='text-muted-foreground text-sm'>
                {invoice.customer?.email || '-'}
              </p>
              <p className='text-muted-foreground text-sm'>
                {invoice.customer?.phone || '-'}
              </p>
              {invoice.customer?.address && (
                <p className='text-muted-foreground mt-2 max-w-xs text-sm'>
                  {invoice.customer.address}
                </p>
              )}
            </div>
          </div>
          <div className='space-y-4 md:text-right'>
            <div>
              <p className='text-muted-foreground mb-1 text-[10px] font-bold tracking-[0.2em] uppercase'>
                Detail Waktu
              </p>
              <div className='space-y-1'>
                <div className='flex justify-between gap-4 md:justify-end'>
                  <span className='text-muted-foreground text-sm'>
                    Tanggal Invoice:
                  </span>
                  <span className='text-sm font-semibold'>
                    {format(new Date(invoice.invoice_date), 'dd MMMM yyyy', {
                      locale: id,
                    })}
                  </span>
                </div>
                <div className='flex justify-between gap-4 md:justify-end'>
                  <span className='text-muted-foreground text-sm'>
                    Jatuh Tempo:
                  </span>
                  <span className='text-sm font-semibold'>
                    {format(new Date(invoice.due_date), 'dd MMMM yyyy', {
                      locale: id,
                    })}
                  </span>
                </div>
                <div className='flex justify-between gap-4 md:justify-end'>
                  <span className='text-muted-foreground text-sm'>
                    Metode Pembayaran:
                  </span>
                  <span className='text-sm font-semibold'>
                    {invoice.payment_term?.name || '-'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className='mb-8' />

        {/* Invoice Items */}
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow className='hover:bg-transparent'>
                <TableHead className='text-muted-foreground h-10 p-4 font-semibold tracking-wider uppercase'>
                  Item
                </TableHead>
                <TableHead className='text-muted-foreground h-10 p-4 font-semibold tracking-wider uppercase'>
                  Deskripsi
                </TableHead>
                <TableHead className='text-muted-foreground h-10 p-4 font-semibold tracking-wider uppercase'>
                  Harga
                </TableHead>
                <TableHead className='text-muted-foreground h-10 p-4 font-semibold tracking-wider uppercase'>
                  Qty
                </TableHead>
                <TableHead className='text-muted-foreground h-10 p-4 font-semibold tracking-wider uppercase'>
                  Discount
                </TableHead>
                <TableHead className='text-muted-foreground h-10 p-4 font-semibold tracking-wider uppercase'>
                  Pajak
                </TableHead>
                <TableHead className='text-muted-foreground h-10 p-4 font-semibold tracking-wider uppercase'>
                  Total Harga
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.invoice_items.map((item, idx) => (
                <TableRow key={idx} className='hover:bg-transparent'>
                  <TableCell className='p-4 align-top'>
                    <p className='font-semibold'>{item.product?.name}</p>
                  </TableCell>
                  <TableCell className='p-4 align-top'>
                    <p className='font-semibold'>{item.description}</p>
                  </TableCell>
                  <TableCell className='p-4 align-top'>
                    <p className='font-semibold'>{item.unit_price}</p>
                  </TableCell>
                  <TableCell className='p-4 align-top'>
                    <p className='font-semibold'>{item.quantity}</p>
                  </TableCell>
                  <TableCell className='p-4 align-top'>
                    <p className='font-semibold'>{item.discount ?? '-'}</p>
                  </TableCell>
                  <TableCell className='p-4 align-top'>
                    <p className='font-semibold'>{item.tax?.name ?? '-'}</p>
                  </TableCell>
                  <TableCell className='p-4 align-top'>
                    <p className='font-semibold'>
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
            <div className='flex justify-between text-sm'>
              <span className='text-muted-foreground'>Subtotal</span>
              <span className='font-medium'>
                {formatCurrency(Number(invoice.subtotal), invoice.currency)}
              </span>
            </div>
            <div className='flex justify-between text-sm font-medium'>
              <span className='text-muted-foreground'>Pajak</span>
              <span>
                {formatCurrency(Number(invoice.tax_total), invoice.currency)}
              </span>
            </div>
            <Separator className='my-2 bg-zinc-300 dark:bg-zinc-700' />
            <div className='flex items-center justify-between'>
              <span className='text-base font-bold'>Total Tagihan</span>
              <span className='text-primary text-2xl font-black'>
                {formatCurrency(Number(invoice.total), invoice.currency)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

import { format } from 'date-fns'
import type { SalesInvoice } from '@/types'
import { id } from 'date-fns/locale'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface InvoiceDetailReceiptProps {
  invoice: SalesInvoice
}

export function InvoiceDetailReceipt({ invoice }: InvoiceDetailReceiptProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'paid':
        return 'default'
      case 'draft':
        return 'secondary'
      case 'cancelled':
        return 'destructive'
      case 'sent':
        return 'outline'
      default:
        return 'default'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: invoice.currency || 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card className='overflow-hidden shadow-md print:border print:shadow-none'>
      <CardHeader className='bg-primary/5 border-b border-dashed pb-8'>
        <div className='flex flex-col items-center space-y-2 text-center'>
          <div className='bg-primary text-primary-foreground mb-2 flex h-14 w-14 items-center justify-center rounded-full text-2xl font-bold'>
            {invoice.company?.name?.charAt(0) || 'M'}
          </div>
          <CardTitle className='text-3xl font-bold'>
            {invoice.company?.name || 'Manajerku'}
          </CardTitle>
          <div className='flex items-center gap-2'>
            <span className='text-muted-foreground font-medium'>
              Invoice #{invoice.invoice_number}
            </span>
            <Badge
              variant={getStatusVariant(invoice.status)}
              className='capitalize'
            >
              {invoice.status}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className='p-8'>
        {/* Info Grid */}
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
        <div className='space-y-6'>
          <div className='text-muted-foreground grid grid-cols-12 gap-4 border-b pb-2 text-[10px] font-bold tracking-wider uppercase'>
            <div className='col-span-6 md:col-span-7'>Item Deskripsi</div>
            <div className='col-span-2 text-center'>Kuantitas</div>
            <div className='col-span-4 text-right md:col-span-3'>
              Total Harga
            </div>
          </div>

          <div className='space-y-4'>
            {invoice.invoice_items.map((item, idx) => (
              <div
                key={idx}
                className='grid grid-cols-12 items-start gap-4 py-1'
              >
                <div className='col-span-6 md:col-span-7'>
                  <p className='font-semibold'>{item.product?.name}</p>
                  {item.description && (
                    <p className='text-muted-foreground mt-0.5 text-xs'>
                      {item.description}
                    </p>
                  )}
                </div>
                <div className='col-span-2 text-center text-sm font-medium'>
                  {item.quantity}
                </div>
                <div className='col-span-4 text-right font-semibold md:col-span-3'>
                  {formatCurrency(item.total)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-10 flex flex-col items-start justify-between gap-8 md:flex-row'>
          <div className='hidden flex-1 md:block'>
            {/* Space for notes or signatures if needed */}
          </div>

          <div className='bg-muted/30 w-full space-y-3 rounded-lg p-6 md:w-80'>
            <div className='flex justify-between text-sm'>
              <span className='text-muted-foreground'>Subtotal</span>
              <span className='font-medium'>
                {formatCurrency(invoice.subtotal)}
              </span>
            </div>
            <div className='flex justify-between text-sm font-medium'>
              <span className='text-muted-foreground'>Pajak</span>
              <span>{formatCurrency(invoice.tax_total)}</span>
            </div>
            <Separator className='my-2 bg-zinc-300 dark:bg-zinc-700' />
            <div className='flex items-center justify-between'>
              <span className='text-base font-bold'>Total Tagihan</span>
              <span className='text-primary text-2xl font-black'>
                {formatCurrency(invoice.total)}
              </span>
            </div>
          </div>
        </div>

        <div className='text-muted-foreground mt-16 border-t border-dashed pt-8 text-center text-[11px] tracking-[0.3em] uppercase'>
          Terima kasih telah mempercayai {invoice.company?.name || 'kami'}.
        </div>
      </CardContent>
    </Card>
  )
}

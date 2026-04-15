import { format } from 'date-fns'
import type { SalesDelivery } from '@/types'
import { id } from 'date-fns/locale'
import { Building2, Mail, Phone, MapPin, Truck, Calendar } from 'lucide-react'
import { formatCurrency, cn, getStatusStyles, invoiceLabel } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
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

interface DeliveryDetailReceiptProps {
  delivery: SalesDelivery
}

export function DeliveryDetailReceipt({ delivery }: DeliveryDetailReceiptProps) {
  return (
    <Card className='border-border gap-1 overflow-hidden shadow-none'>
      <CardHeader className=''>
        <div className='flex items-center justify-between'>
          <CardTitle className='flex items-center gap-2 text-lg font-bold tracking-tight'>
            # {delivery.invoice_number}
            <Badge
              variant='outline'
              className={cn(
                'h-5 px-1.5 text-[10px] font-bold tracking-wider uppercase',
                getStatusStyles(delivery.payment_status)
              )}
            >
              {invoiceLabel[delivery.payment_status] || delivery.payment_status}
            </Badge>
          </CardTitle>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className='px-4 pt-4'>
        <div className='mb-6 grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2 lg:grid-cols-3'>
          <div className=''>
            <p className='text-muted-foreground text-[10px] font-bold tracking-widest uppercase'>
              Pelanggan:
            </p>
            <div className=''>
              <div>
                <p className='text-md text-primary font-bold'>
                  {delivery.customer?.name}
                </p>
                <div className='mt-1 flex items-center gap-2'>
                  <Building2 className='text-muted-foreground h-3.5 w-3.5' />
                  <p className='text-muted-foreground text-xs'>
                    {delivery?.customer?.company_name || '-'}
                  </p>
                </div>
              </div>

              <div className='space-y-1.5'>
                <div className='flex items-center gap-2'>
                  <Mail className='text-muted-foreground h-3.5 w-3.5' />
                  <p className='text-muted-foreground text-xs'>
                    {delivery.customer?.email || '-'}
                  </p>
                </div>
                <div className='flex items-center gap-2'>
                  <Phone className='text-muted-foreground h-3.5 w-3.5' />
                  <p className='text-muted-foreground text-xs'>
                    {delivery.customer?.phone || '-'}
                  </p>
                </div>
                <div className='flex items-start gap-2 pt-0.5'>
                  <MapPin className='text-muted-foreground mt-0.5 h-3.5 w-3.5 flex-shrink-0' />
                  <p className='text-muted-foreground max-w-xs text-xs leading-relaxed'>
                    {delivery.customer?.address || '-'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=''>
            <div>
              <p className='text-muted-foreground text-[10px] font-bold tracking-widest uppercase'>
                Informasi Pengiriman:
              </p>
              <div className='mt-1.5 space-y-1.5'>
                <div className='flex items-baseline gap-2'>
                  <Calendar className='text-muted-foreground h-3.5 w-3.5' />
                  <span className='text-muted-foreground w-32 text-xs'>
                    Tanggal Pengiriman:
                  </span>
                  <span className='text-primary text-xs font-semibold'>
                    {delivery.shipping_date
                      ? format(
                          new Date(delivery.shipping_date),
                          'dd MMM yyyy',
                          { locale: id }
                        )
                      : '-'}
                  </span>
                </div>
                <div className='flex items-baseline gap-2'>
                  <Truck className='text-muted-foreground h-3.5 w-3.5' />
                  <span className='text-muted-foreground w-32 text-xs'>
                    Ekspedisi:
                  </span>
                  <span className='text-primary text-xs font-semibold'>
                    {delivery.expedition?.name || '-'}
                  </span>
                </div>
                <div className='flex items-baseline gap-2'>
                  <span className='text-muted-foreground w-32 text-xs'>
                    No. Resi:
                  </span>
                  <span className='text-primary text-xs font-semibold'>
                    {delivery.tracking_number || '-'}
                  </span>
                </div>
              </div>
            </div>
            <div className='mt-5'>
              <p className='text-muted-foreground text-[10px] font-bold tracking-widest uppercase'>
                Detail Waktu:
              </p>
              <div className='mt-1.5 space-y-1.5'>
                <div className='flex items-baseline gap-2'>
                  <span className='text-muted-foreground w-32 text-xs'>
                    Tanggal Invoice:
                  </span>
                  <span className='text-primary text-xs font-semibold'>
                    {format(new Date(delivery.invoice_date), 'dd MMM yyyy', {
                      locale: id,
                    })}
                  </span>
                </div>
                <div className='flex items-baseline gap-2'>
                  <span className='text-muted-foreground w-32 text-xs'>
                    Jatuh Tempo:
                  </span>
                  <span className='text-primary text-xs font-semibold'>
                    {format(new Date(delivery.due_date), 'dd MMM yyyy', {
                      locale: id,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='space-y-1'>
            <div>
              <p className='text-muted-foreground text-[10px] font-bold tracking-widest uppercase'>
                Tag
              </p>
              <div className='mt-1.5 flex flex-wrap gap-1.5'>
                {delivery.tags && delivery.tags.length > 0 ? (
                  delivery.tags.map((tag, idx) => (
                    <Badge
                      key={idx}
                      variant='secondary'
                      className='h-5 px-1.5 text-[10px] font-medium uppercase'
                    >
                      {typeof tag === 'object' ? tag.name : tag}
                    </Badge>
                  ))
                ) : (
                  <span className='text-muted-foreground text-xs'>-</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <Separator className='mb-4' />

        {/* Delivery Items */}
        <div className='overflow-hidden rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow className='bg-muted/50 hover:bg-transparent'>
                <TableHead className='text-muted-foreground h-8 px-2 py-1 text-[10px] font-bold tracking-wider uppercase'>
                  Item
                </TableHead>
                <TableHead className='text-muted-foreground h-8 px-2 py-1 text-[10px] font-bold tracking-wider uppercase'>
                  Deskripsi
                </TableHead>
                <TableHead className='text-muted-foreground h-8 px-2 py-1 text-[10px] font-bold tracking-wider uppercase'>
                  Harga
                </TableHead>
                <TableHead className='text-muted-foreground h-8 px-2 py-1 text-center text-[10px] font-bold tracking-wider uppercase'>
                  Qty
                </TableHead>
                <TableHead className='text-muted-foreground h-8 px-2 py-1 text-[10px] font-bold tracking-wider uppercase'>
                  Discount
                </TableHead>
                <TableHead className='text-muted-foreground h-8 px-2 py-1 text-[10px] font-bold tracking-wider uppercase'>
                  Pajak
                </TableHead>
                <TableHead className='text-muted-foreground h-8 px-2 py-1 text-right text-[10px] font-bold tracking-wider uppercase'>
                  Total
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {delivery.sales_invoice_items.map((item, idx) => (
                <TableRow
                  key={idx}
                  className='hover:bg-muted/40 transition-colors'
                >
                  <TableCell className='px-2 py-1.5 align-top'>
                    <p className='text-primary text-[13px] font-semibold'>
                      {item.product?.name || '-'}
                    </p>
                  </TableCell>
                  <TableCell className='px-2 py-1.5 align-top'>
                    <p className='text-[13px]'>{item.description || '-'}</p>
                  </TableCell>
                  <TableCell className='px-2 py-1.5 align-top'>
                    <p className='text-[13px] font-medium'>
                      {formatCurrency(
                        Number(item.unit_price),
                        delivery.currency
                      )}
                    </p>
                  </TableCell>
                  <TableCell className='px-2 py-1.5 text-center align-top'>
                    <p className='text-[13px] font-medium'>
                      {item.quantity || '-'}
                    </p>
                  </TableCell>
                  <TableCell className='px-2 py-1.5 align-top'>
                    <p className='text-[13px] font-medium'>
                      {item.discount ? item.discount + '%' : '-'}
                    </p>
                  </TableCell>
                  <TableCell className='px-2 py-1.5 align-top'>
                    <p className='text-muted-foreground text-[13px] font-medium'>
                      {item.tax?.name ?? '-'}
                    </p>
                  </TableCell>
                  <TableCell className='px-2 py-1.5 text-right align-top'>
                    <p className='text-[13px] font-bold'>
                      {formatCurrency(
                        Number(item.line_total),
                        delivery.currency
                      )}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Summary - Only show shipping fee */}
        <div className='mt-6 flex justify-end'>
          <div className='bg-muted/20 w-full space-y-1.5 rounded-lg p-4 md:w-80'>
            <div className='flex justify-between border-b pb-2 text-sm'>
              <span className='text-muted-foreground'>Ongkos Kirim</span>
              <span className='font-semibold'>
                {formatCurrency(Number(delivery.shipping_fee), delivery.currency)}
              </span>
            </div>
            <div className='flex justify-between pt-2 text-sm'>
              <span className='text-sm font-bold'>Total Ongkos Kirim</span>
              <span className='text-lg font-black'>
                {formatCurrency(Number(delivery.shipping_fee), delivery.currency)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

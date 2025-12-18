import { useLocation } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useInvoiceFormQuery } from '../invoice-form/hooks/use-invoice-form-query'
import { InvoiceDetailReceipt } from './components/invoice-detail-receipt'

export function InvoiceDetail() {
  const location = useLocation()
  const currentRowId = (location.state as { currentRowId?: string })
    ?.currentRowId

  const { data: invoice, isLoading } = useInvoiceFormQuery({ id: currentRowId })

  if (isLoading) {
    return (
      <div className='flex h-[60vh] items-center justify-center font-medium'>
        Memuat data invoice...
      </div>
    )
  }

  if (!invoice) {
    return (
      <Card className='flex h-[60vh] flex-col items-center justify-center gap-4'>
        <CardContent>
          <p className='text-muted-foreground'>Data invoice tidak ditemukan.</p>
          <Button onClick={() => history.back()} variant='outline'>
            <ArrowLeft className='mr-2 h-4 w-4' /> Kembali
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className='mb-8 flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-semibold tracking-tight'>
              Detail Tagihan Pembelian {invoice.invoice_number}
            </h1>
          </div>
          <div className='mr-4 flex gap-2'>
            <Button
              variant='ghost'
              onClick={() => history.back()}
              className='gap-2'
            >
              <ArrowLeft className='h-4 w-4' /> Kembali
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <InvoiceDetailReceipt invoice={invoice} />
      </CardContent>
    </Card>
  )
}

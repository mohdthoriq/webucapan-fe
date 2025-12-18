import { useLocation } from '@tanstack/react-router'
import { Printer, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
      <div className='flex h-[60vh] flex-col items-center justify-center gap-4'>
        <p className='text-muted-foreground'>Data invoice tidak ditemukan.</p>
        <Button onClick={() => history.back()} variant='outline'>
          <ArrowLeft className='mr-2 h-4 w-4' /> Kembali
        </Button>
      </div>
    )
  }

  return (
    <div className='mx-auto max-w-2xl px-4 py-8'>
      <div className='mb-6 flex items-center justify-between'>
        <Button
          variant='ghost'
          onClick={() => history.back()}
          className='gap-2'
        >
          <ArrowLeft className='h-4 w-4' /> Kembali
        </Button>
        <Button
          variant='outline'
          className='gap-2'
          onClick={() => window.print()}
        >
          <Printer className='h-4 w-4' /> Cetak Struk
        </Button>
      </div>

      <InvoiceDetailReceipt invoice={invoice} />
    </div>
  )
}

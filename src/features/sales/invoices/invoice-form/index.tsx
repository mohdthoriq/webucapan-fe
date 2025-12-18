import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { InvoiceFormContent } from './components/invoice-form-content'
import { InvoiceFormProvider } from './components/invoice-form-provider'
import { useInvoiceForm } from './hooks/use-invoice-form'
import { Button } from '@/components/ui/button'
import { useLocation } from '@tanstack/react-router'
import { useInvoiceFormQuery } from './hooks/use-invoice-form-query'

export function InvoiceFormPage() {
  const location = useLocation()

  const currentRowId = (location.state as { currentRowId?: string })?.currentRowId

  const currentRow = useInvoiceFormQuery({ id: currentRowId })

  const invoiceForm = useInvoiceForm({ currentRow: currentRow.data })

  return (
    <InvoiceFormProvider value={invoiceForm}>
      <Card className='mb-8'>
        <CardHeader>
          <CardTitle>
            <div className='flex items-center justify-between'>
              {invoiceForm.isEdit ? 'Edit Invoice' : 'Buat Invoice Baru'}
              <Button variant='link' onClick={() => history.back()}>Kembali</Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <InvoiceFormContent />
        </CardContent>
      </Card>
    </InvoiceFormProvider>
  )
}

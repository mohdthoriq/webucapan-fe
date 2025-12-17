import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { InvoiceFormContent } from './components/invoice-form-content'
import { InvoiceFormProvider } from './components/invoice-form-provider'
import { useInvoiceForm } from './hooks/use-invoice-form'

export function InvoiceFormPage() {
  const currentRow = undefined

  const invoiceForm = useInvoiceForm({ currentRow })

  return (
    <InvoiceFormProvider value={invoiceForm}>
      <Card className='mb-8'>
        <CardHeader>
          <CardTitle>
            {invoiceForm.isEdit ? 'Edit Invoice' : 'Buat Invoice Baru'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <InvoiceFormContent />
        </CardContent>
      </Card>
    </InvoiceFormProvider>
  )
}

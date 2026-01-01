import { useLocation } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { useInvoiceForm } from './hooks/use-invoice-form'
import { useDefaultNumberingQuery, useInvoiceFormQuery } from './hooks/use-invoice-form-query'
import { InvoiceFormActions } from './sections/form-actions'
import { InvoiceFormHeader } from './sections/form-header'
import { InvoiceFormItems } from './sections/form-items-table'
import { InvoiceFormSummary } from './sections/form-summary'
import { FinanceNumberType } from '@/types'

export function InvoiceFormPage() {
  const location = useLocation()

  const currentRowId = (location.state as { currentRowId?: string })
    ?.currentRowId

  const currentRow = useInvoiceFormQuery({ id: currentRowId })

  const { data: invoiceAutoNumbering } = useDefaultNumberingQuery({
    type: FinanceNumberType.purchase_invoice,
  })

  const invoiceForm = useInvoiceForm({
    currentRow: currentRow.data ?? undefined,
    autoNumbering: invoiceAutoNumbering,
  })

  if (currentRowId && currentRow.isLoading) {
    return (
      <Card className='mb-8'>
        <CardHeader>
          <CardTitle>Memuat data invoice...</CardTitle>
        </CardHeader>
        <CardContent className='flex h-40 items-center justify-center font-medium'>
          Mohon tunggu sebentar...
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className='mb-8'>
      <CardHeader>
        <CardTitle>
          <div className='flex items-center justify-between'>
            {invoiceForm.isEdit ? 'Edit Invoice' : 'Buat Invoice Baru'}
            <Button variant='link' onClick={() => history.back()}>
              Kembali
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...invoiceForm.form}>
          <form
            onSubmit={invoiceForm.form.handleSubmit(invoiceForm.onSubmit)}
            className='space-y-8'
            id='invoice-form'
          >
            <InvoiceFormHeader />
            <div className='bg-border h-px' />
            <InvoiceFormItems />
            <InvoiceFormSummary />
            <InvoiceFormActions
              isEdit={invoiceForm.isEdit}
              isSubmitting={invoiceForm.isSubmitting}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

import { InvoiceFormPage } from '@/features/purchases/invoices/invoice-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/purchases/invoices/edit/')({
  component: InvoiceFormPage,
})

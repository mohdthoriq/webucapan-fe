import { additionalDiscount, invoiceItemSchema, invoiceItemUpdateSchema, updateAdditionalDiscount } from '@/features/sales/invoices/invoice-form/types/invoice-form.schema'
import { z } from 'zod'

export const CreateInvoiceSchema = z
  .object({
    vendor_id: z.string().min(1, 'Vendor tidak boleh kosong'),
    payment_term_id: z.string().optional(),
    invoice_number: z.string().min(1, 'Nomor invoice tidak boleh kosong'),

    invoice_date: z.date(),
    due_date: z.date(),

    currency: z.string().min(1, 'Mata uang tidak boleh kosong'),
    subtotal: z.number().nonnegative(),
    tax_total: z.number().nonnegative(),
    total: z.number().nonnegative(),

    payment_status: z.enum(['unpaid', 'partially_paid', 'paid']),

    purchase_invoice_items: z
      .array(invoiceItemSchema)
      .min(1, 'Invoice harus memiliki minimal 1 item'),
    tags: z.array(z.uuid()).nullable(),
    additional_discounts: z.array(additionalDiscount).optional(),
  })
  .refine((data) => data.invoice_date <= data.due_date, {
    message: 'Tanggal jatuh tempo harus lebih dari tanggal invoice',
    path: ['due_date'],
  })

export type CreateInvoiceFormData = z.infer<typeof CreateInvoiceSchema>

export const UpdateInvoiceSchema = z
  .object({
    id: z.uuid().min(1, 'ID invoice tidak boleh kosong'),
    vendor_id: z.string().min(1, 'Vendor tidak boleh kosong'),
    payment_term_id: z.string().optional(),
    invoice_number: z.string().min(1, 'Nomor invoice tidak boleh kosong'),

    invoice_date: z.date(),
    due_date: z.date(),

    currency: z.string().min(1, 'Mata uang tidak boleh kosong'),
    subtotal: z.number().nonnegative(),
    tax_total: z.number().nonnegative(),
    total: z.number().nonnegative(),

    payment_status: z.enum(['unpaid', 'partially_paid', 'paid']),

    purchase_invoice_items: z
      .array(invoiceItemUpdateSchema)
      .min(1, 'Invoice harus memiliki minimal 1 item'),
    tags: z.array(z.uuid()).nullable(),
    additionalDiscount: z.array(updateAdditionalDiscount).optional(),
  })
  .refine((data) => data.invoice_date <= data.due_date, {
    message: 'Tanggal jatuh tempo harus lebih dari tanggal invoice',
    path: ['due_date'],
  })

export type UpdateInvoiceFormData = z.infer<typeof UpdateInvoiceSchema>

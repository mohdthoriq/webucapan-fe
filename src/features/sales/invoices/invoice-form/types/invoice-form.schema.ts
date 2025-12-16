import { z } from 'zod';

const invoiceItemSchema = z.object({
  product_id: z.string().min(1),
  description: z.string().min(1),
  quantity: z.number().positive(),
  unit_price: z.number().positive(),
  tax_id: z.string().min(1),
  discount: z.number().positive(),
  total: z.number().positive(),
})

const invoiceItemUpdateSchema = z.object({
  id: z.uuid().min(1, 'ID item tidak boleh kosong'),
  product_id: z.string().min(1),
  description: z.string().min(1),
  quantity: z.number().positive(),
  unit_price: z.number().positive(),
  tax_id: z.string().min(1),
  discount: z.number().positive(),
  total: z.number().positive(),
})

export const CreateInvoiceSchema = z.object({
  company_id: z.string().min(1),
  customer_id: z.string().min(1),
  payment_term_id: z.string().min(1),
  invoice_number: z.string().min(1),

  invoice_date: z.date(),
  due_date: z.date(),

  currency: z.string().min(1),
  subtotal: z.number().positive(),
  tax_total: z.number().positive(),
  total: z.number().positive(),

  status: z.enum(['draft', 'sent', 'paid', 'cancelled']),

  invoice_items: z
    .array(invoiceItemSchema)
    .min(1, 'Invoice harus memiliki minimal 1 item'),
})

export type CreateInvoiceFormData = z.infer<typeof CreateInvoiceSchema>

export const UpdateInvoiceSchema = z.object({
  id: z.uuid().min(1, 'ID invoice tidak boleh kosong'),
  company_id: z.string().min(1),
  customer_id: z.string().min(1),
  payment_term_id: z.string().min(1),
  invoice_number: z.string().min(1),

  invoice_date: z.date(),
  due_date: z.date(),

  currency: z.string().min(1),
  subtotal: z.number().positive(),
  tax_total: z.number().positive(),
  total: z.number().positive(),

  status: z.enum(['draft', 'sent', 'paid', 'cancelled']),

  invoice_items: z
    .array(invoiceItemUpdateSchema)
    .min(1, 'Invoice harus memiliki minimal 1 item'),
})

export type UpdateInvoiceFormData = z.infer<typeof UpdateInvoiceSchema>

export const DeleteInvoiceSchema = z.object({
  id: z.uuid().min(1, 'ID invoice tidak boleh kosong'),
})

export type DeleteInvoiceFormData = z.infer<typeof DeleteInvoiceSchema>
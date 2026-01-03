import { z } from 'zod'

export const invoicePaymentsSchema = z.object({
  payment_date: z.date(),
  amount: z.number().min(1, 'Jumlah harus lebih dari 0'),
  method: z.string().min(1, 'Metode pembayaran harus dipilih'),
  account_id: z.uuid('Akun harus dipilih'),
  reference_no: z.string().optional(),
  note: z.string().optional(),
})

export type InvoicePaymentsFormData = z.infer<typeof invoicePaymentsSchema>

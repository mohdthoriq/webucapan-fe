import { z } from 'zod'

export const deleteInvoiceSchema = z.object({
  id: z.uuid().min(1, 'ID tagihan tidak boleh kosong'),
})

export type DeleteInvoiceFormData = z.infer<typeof deleteInvoiceSchema>

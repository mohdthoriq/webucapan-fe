import { z } from 'zod'

export const expensesPaymentsSchema = z.object({
  payment_date: z.date(),
  amount: z.number().min(1, 'Jumlah harus lebih dari 0'),
  method: z.string().min(1, 'Metode pembayaran harus dipilih'),
  account_id: z.uuid('Akun harus dipilih'),
  reference_no: z.string().optional(),
  note: z.string().optional(),
  tags: z.array(z.uuid()).nullable(),
})

export type ExpensesPaymentsFormData = z.infer<typeof expensesPaymentsSchema>

export const deleteExpensesSchema = z.object({
  ids: z
    .array(z.string())
    .min(1, 'Pilih setidaknya satu invoice untuk dihapus'),
})

export type DeleteExpensesFormData = z.infer<typeof deleteExpensesSchema>

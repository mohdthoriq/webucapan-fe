import { z } from 'zod'

export const expenseItemSchema = z.object({
  account_id: z.string().min(1),
  description: z.string().optional(),
  tax_id: z.string().optional(),
  amount: z.number().min(0, 'Total tidak boleh negatif'),
})

export type ExpenseItemFormData = z.infer<typeof expenseItemSchema>

export const expenseItemUpdateSchema = z.object({
  id: z.uuid('ID item tidak boleh kosong').optional().nullable(),
  account_id: z.string().min(1),
  description: z.string().optional(),
  tax_id: z.string().optional(),
  amount: z.number().min(0, 'Total tidak boleh negatif'),
})

export type ExpenseItemUpdateFormData = z.infer<typeof expenseItemUpdateSchema>

export const CreateExpenseSchema = z
  .object({
    contact_id: z.string().min(1, 'Penerima tidak boleh kosong'),
    account_id: z.uuid('ID akun tidak boleh kosong').optional().nullable(),
    payment_term_id: z.string().optional(),
    expense_number: z.string().min(1, 'Nomor expense tidak boleh kosong'),

    date: z.date(),
    due_date: z.date(),

    currency: z.string().optional(),
    subtotal: z.number().nonnegative(),
    tax_total: z.number().nonnegative(),
    total: z.number().nonnegative(),

    is_paylater: z.boolean().optional(),

    expense_items: z
      .array(expenseItemSchema)
      .min(1, 'Expense harus memiliki minimal 1 item'),
    tags: z.array(z.uuid()).nullable(),
  })
  .refine((data) => data.date <= data.due_date, {
    message: 'Tanggal jatuh tempo harus lebih dari tanggal invoice',
    path: ['due_date'],
  })

export type CreateExpenseFormData = z.infer<typeof CreateExpenseSchema>

export const UpdateExpenseSchema = z
  .object({
    id: z.uuid().min(1, 'ID expense tidak boleh kosong'),
    contact_id: z.string().min(1, 'Penerima tidak boleh kosong'),
    payment_term_id: z.string().optional(),
    expense_number: z.string().min(1, 'Nomor expense tidak boleh kosong'),

    date: z.date(),
    due_date: z.date(),

    currency: z.string().optional(),
    subtotal: z.number().nonnegative(),
    tax_total: z.number().nonnegative(),
    total: z.number().nonnegative(),

    is_paylater: z.boolean(),

    expense_items: z
      .array(expenseItemUpdateSchema)
      .min(1, 'Expense harus memiliki minimal 1 item'),
    tags: z.array(z.uuid()).nullable(),
  })
  .refine((data) => data.date <= data.due_date, {
    message: 'Tanggal jatuh tempo harus lebih dari tanggal expense',
    path: ['due_date'],
  })

export type UpdateExpenseFormData = z.infer<typeof UpdateExpenseSchema>

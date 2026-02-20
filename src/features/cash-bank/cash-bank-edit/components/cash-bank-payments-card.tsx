import { format } from 'date-fns'
import { TransactionType } from '@/types'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { InputFieldNumberFormat } from '@/components/forms/input-field-number-format'
import { MultiSelectDropdown } from '@/components/forms/multi-select-dropdown'
import { useExpensesPaymentsForm } from '@/features/expenses/expenses-detail/hooks/use-expenses-payments-form'
import { useInvoicePaymentsForm as usePurchasesInvoicePaymentsForm } from '@/features/purchases/invoices/invoice-detail/hooks/use-invoice-payments-form'
import { InvoicePaymentsCombobox } from '@/features/sales/invoices/invoice-detail/components/invoice-payments-combobox'
import { useInvoicePaymentsForm as useSalesInvoicePaymentsForm } from '@/features/sales/invoices/invoice-detail/hooks/use-invoice-payments-form'
import { useTagsQuery } from '@/features/settings/tags/hooks/use-tags-query'
import type { CashBankTransactionDetail } from '../../cash-bank-detail/types/cash-bank-detail.types'

interface CashBankPaymentsCardProps {
  transaction: CashBankTransactionDetail
}

function ExpensePaymentForm({ transaction }: CashBankPaymentsCardProps) {
  const { data: tags } = useTagsQuery({ page: 1, limit: 100 })

  const { form, onSubmit, isSubmitting } = useExpensesPaymentsForm({
    expenseId: transaction.items[0]?.id ?? '',
    defaultAmount: transaction.amount,
    currentRow: {
      id: transaction.id,
      payment_date: new Date(transaction.trans_date),
      amount: transaction.amount,
      account_id: transaction.bank_account.id,
      note: transaction.memo ?? undefined,
      tags: transaction.tags.map((t) => t.id) ?? null,
      expense_id: transaction.items[0]?.id,
    },
  })

  return (
    <PaymentForm
      form={form}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      tags={tags}
      showReferenceNo={false}
    />
  )
}

function SalesInvoicePaymentForm({ transaction }: CashBankPaymentsCardProps) {
  const { data: tags } = useTagsQuery({ page: 1, limit: 100 })

  const { form, onSubmit, isSubmitting } = useSalesInvoicePaymentsForm({
    invoiceId: transaction.items[0]?.id ?? '',
    defaultAmount: transaction.amount,
    currentRow: {
      id: transaction.id,
      payment_date: new Date(transaction.trans_date),
      amount: transaction.amount,
      account_id: transaction.bank_account.id,
      reference_no: transaction.ref_number ?? undefined,
      note: transaction.memo ?? undefined,
      tags: transaction.tags.map((t) => t.id),
      sales_invoice_id: transaction.items[0]?.id,
    },
  })

  return (
    <PaymentForm
      form={form}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      tags={tags}
      showReferenceNo
    />
  )
}

function PurchaseInvoicePaymentForm({
  transaction,
}: CashBankPaymentsCardProps) {
  const { data: tags } = useTagsQuery({ page: 1, limit: 100 })

  const { form, onSubmit, isSubmitting } = usePurchasesInvoicePaymentsForm({
    invoiceId: transaction.items[0]?.id ?? '',
    defaultAmount: transaction.amount,
    currentRow: {
      id: transaction.id,
      payment_date: new Date(transaction.trans_date),
      amount: transaction.amount,
      account_id: transaction.bank_account.id,
      reference_no: transaction.ref_number ?? undefined,
      note: transaction.memo ?? undefined,
      tags: transaction.tags.map((t) => t.id),
      purchase_invoice_id: transaction.items[0]?.id,
    },
  })

  return (
    <PaymentForm
      form={form}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      tags={tags}
      showReferenceNo
    />
  )
}

interface PaymentFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => Promise<void>
  isSubmitting: boolean
  tags: { data: { id: string; name: string }[] } | undefined
  showReferenceNo?: boolean
}

function PaymentForm({
  form,
  onSubmit,
  isSubmitting,
  tags,
  showReferenceNo = false,
}: PaymentFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 pt-4'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {/* Amount */}
          <FormField
            control={form.control}
            name='amount'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Pembayaran</FormLabel>
                <FormControl>
                  <InputFieldNumberFormat
                    value={field.value ?? ''}
                    onValueChange={(value) => field.onChange(value ?? 0)}
                    placeholder='0'
                    prefix='Rp'
                    className='min-w-[100px]'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Payment Date */}
          <FormField
            control={form.control}
            name='payment_date'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Tanggal Pembayaran</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pilih tanggal</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      autoFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Account */}
          <FormField
            control={form.control}
            name='account_id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dibayar dari</FormLabel>
                <InvoicePaymentsCombobox
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder='Pilih akun'
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tags */}
          <FormField
            control={form.control}
            name='tags'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tag</FormLabel>
                <FormControl>
                  <MultiSelectDropdown
                    options={
                      tags?.data.map((tag) => ({
                        label: tag.name,
                        value: tag.id,
                      })) ?? []
                    }
                    selected={field.value ?? []}
                    onChange={field.onChange}
                    placeholder='Pilih tag'
                    disabled={!tags?.data.length}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Reference No — only for invoice payments */}
          {showReferenceNo && (
            <FormField
              control={form.control}
              name='reference_no'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor</FormLabel>
                  <FormControl>
                    <Input placeholder='Contoh: REF-001' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Note */}
          <FormField
            control={form.control}
            name='note'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Referensi
                  <Tooltip>
                    <TooltipProvider>
                      <TooltipTrigger>
                        <span className='text-muted-foreground text-xs'>
                          {' '}
                          (?)
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Catatan internal untuk mempermudah pencarian
                          (opsional)
                        </p>
                      </TooltipContent>
                    </TooltipProvider>
                  </Tooltip>
                </FormLabel>
                <FormControl>
                  <Input placeholder='Catatan pembayaran...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex justify-end'>
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Memproses...' : 'Simpan Perubahan'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export function CashBankPaymentsCard({
  transaction,
}: CashBankPaymentsCardProps) {
  const renderForm = () => {
    switch (transaction.trans_type_id) {
      case TransactionType.SalesInvoice:
        return <SalesInvoicePaymentForm transaction={transaction} />
      case TransactionType.PurchaseInvoice:
        return <PurchaseInvoicePaymentForm transaction={transaction} />
      case TransactionType.Expense:
        return <ExpensePaymentForm transaction={transaction} />
      default:
        return (
          <p className='text-muted-foreground py-4 text-sm'>
            Tipe transaksi ini tidak mendukung pengeditan pembayaran.
          </p>
        )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ubah Rincian Pembayaran</CardTitle>
      </CardHeader>
      <hr />
      <CardContent>{renderForm()}</CardContent>
    </Card>
  )
}

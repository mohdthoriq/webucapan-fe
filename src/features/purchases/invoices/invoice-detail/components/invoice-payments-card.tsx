'use client'

import { format } from 'date-fns'
import { useWatch } from 'react-hook-form'
import { FinanceNumberType, type PurchaseInvoice } from '@/types'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDebounce } from '@/hooks/use-debounce'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { InputFieldNumberFormat } from '@/components/forms/input-field-number-format'
import {
  useCheckFinanceNumberQuery,
  useDefaultNumberingQuery,
} from '../../invoice-form/hooks/use-invoice-form-query'
import { useInvoicePaymentsForm } from '../hooks/use-invoice-payments-form'
import { InvoicePaymentsCombobox } from './invoice-payments-combobox'

interface InvoicePaymentsCardProps {
  invoice: PurchaseInvoice
}

export function InvoicePaymentsCard({ invoice }: InvoicePaymentsCardProps) {
  const { data: invoicePaymentsAutoNumbering } = useDefaultNumberingQuery({
    type: FinanceNumberType.purchase_payment,
  })

  const { form, onSubmit, isSubmitting } = useInvoicePaymentsForm({
    invoiceId: invoice.id,
    defaultAmount: Number(invoice.outstanding),
    defaultNumber: invoicePaymentsAutoNumbering,
  })

  const { control, formState } = form

  const invoicePayments = useWatch({ control, name: 'reference_no' })
  const debouncedInvoicePayments = useDebounce(invoicePayments, 500)

  const isOriginalNumber =
    !!debouncedInvoicePayments &&
    debouncedInvoicePayments === (formState.defaultValues?.reference_no ?? '')

  const {
    data: checkResult,
    isFetching: isCheckingNumber,
    isError: hasCheckError,
  } = useCheckFinanceNumberQuery({
    type: FinanceNumberType.sales_payment,
    number: debouncedInvoicePayments as string,
  })

  const numberIsTaken =
    !isOriginalNumber &&
    checkResult &&
    (checkResult.exists === true || checkResult.available === false)

  if (invoice.payment_status === 'paid') return null

  const paymentMethods = [
    { label: 'Tunai (Cash)', value: 'cash' },
    { label: 'Transfer Bank', value: 'bank_transfer' },
    { label: 'E-Wallet', value: 'ewallet' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kirim Pembayaran</CardTitle>
      </CardHeader>
      <hr />
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 pt-4'
          >
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
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
                            variant={'outline'}
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

              {/* Amount */}
              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {invoice.payment_status === 'paid'
                        ? 'Jumlah Pembayaran'
                        : 'Pembayaran Sisa'}
                    </FormLabel>
                    <FormControl>
                      <InputFieldNumberFormat
                        value={field.value ?? ''}
                        onValueChange={(value) => field.onChange(value ?? '')}
                        placeholder='0'
                        prefix='Rp'
                        className='min-w-[100px]'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Payment Method */}
            <div className='grid grid-cols-1 items-center gap-4 md:grid-cols-2 lg:grid-cols-3'>
              <FormField
                control={form.control}
                name='method'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Metode Pembayaran</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Pilih metode' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {paymentMethods.map((method) => (
                          <SelectItem key={method.value} value={method.value}>
                            {method.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                    <FormLabel>Akun (Bank/Kas)</FormLabel>
                    <InvoicePaymentsCombobox
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                      placeholder='Pilih akun'
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Reference No */}
              <FormField
                control={form.control}
                name='reference_no'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Referensi</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input placeholder='Contoh: TRF-12345' {...field} />
                        {isCheckingNumber && (
                          <div className='absolute top-1/2 right-2 -translate-y-1/2'>
                            <div className='border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent' />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    {numberIsTaken || hasCheckError ? (
                      <p className='text-destructive text-[0.8rem] font-medium'>
                        {checkResult?.message ||
                          (hasCheckError
                            ? 'Gagal memeriksa nomor referensi'
                            : 'Nomor referensi sudah digunakan')}
                      </p>
                    ) : (
                      <FormMessage />
                    )}
                  </FormItem>
                )}
              />
            </div>

            {/* Note */}
            <FormField
              control={form.control}
              name='note'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catatan</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Catatan tambahan mengenai pembayaran ini...'
                      className='min-h-[80px] resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-end'>
              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Memproses...' : 'Simpan Pembayaran'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

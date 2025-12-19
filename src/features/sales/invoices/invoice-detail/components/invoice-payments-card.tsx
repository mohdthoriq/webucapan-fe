'use client'

import { format } from 'date-fns'
import type { SalesInvoice } from '@/types'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { InputFieldRupiah } from '@/components/forms/input-field-number-format'
import { useInvoicePaymentsForm } from '../hooks/use-invoice-payments-form'
import { InvoicePaymentsCombobox } from './invoice-payments-combobox'

interface InvoicePaymentsCardProps {
  invoice: SalesInvoice
}

export function InvoicePaymentsCard({ invoice }: InvoicePaymentsCardProps) {
  const { form, onSubmit, isSubmitting } = useInvoicePaymentsForm({
    invoiceId: invoice.id,
    defaultAmount: Number(invoice.outstanding),
  })

  if (invoice.status === 'paid') return null

  const paymentMethods = [
    { label: 'Tunai (Cash)', value: 'cash' },
    { label: 'Transfer Bank', value: 'bank_transfer' },
    { label: 'E-Wallet', value: 'ewallet' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Terima Pembayaran</CardTitle>
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
                    <FormLabel>Jumlah Pembayaran</FormLabel>
                    <FormControl>
                      <InputFieldRupiah
                        value={field.value}
                        onValueChange={field.onChange}
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
                      <Input placeholder='Contoh: TRF-12345' {...field} />
                    </FormControl>
                    <FormMessage />
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

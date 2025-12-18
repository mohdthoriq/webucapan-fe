import { format } from 'date-fns'
import { CalendarIcon, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
import { Separator } from '@/components/ui/separator'
import { MultiSelectDropdown } from '@/components/forms/multi-select-dropdown'
import { usePaymentTermsQuery } from '@/features/settings/payment-terms/hooks/use-payment-terms-query'
import { useTagsQuery } from '@/features/settings/tags/hooks/use-tags-query'
import { InvoiceFormCombobox } from './invoice-form-combobox'
import { useInvoiceFormContext } from './invoice-form-context'
import { InvoiceItemsTable } from './invoice-items-table'

export function InvoiceFormContent() {
  const {
    form,
    fields,
    append,
    remove,
    onSubmit,
    isSubmitting,
    isEdit,
    totals,
  } = useInvoiceFormContext()

  const { data: paymentTerms } = usePaymentTermsQuery({ page: 1, limit: 100 })

  const { data: tags } = useTagsQuery({ page: 1, limit: 100 })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'
        id='invoice-form'
      >
        {/* Header Section */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {/* Customer */}
          <FormField
            control={form.control}
            name='customer_id'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Pelanggan</FormLabel>
                <FormControl>
                  <InvoiceFormCombobox
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value)
                    }}
                    placeholder='Pilih Pelanggan'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Invoice Number */}
          <FormField
            control={form.control}
            name='invoice_number'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Invoice</FormLabel>
                <FormControl>
                  <Input placeholder='INV-001' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {/* Status */}
          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Pilih status' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='draft'>Draft</SelectItem>
                    <SelectItem value='issued'>Issued</SelectItem>
                    <SelectItem value='paid'>Paid</SelectItem>
                    <SelectItem value='cancelled'>Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Currency */}
          <FormField
            control={form.control}
            name='currency'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mata Uang</FormLabel>
                <FormControl>
                  <Input {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Invoice Date */}
          <FormField
            control={form.control}
            name='invoice_date'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Tanggal Invoice</FormLabel>
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
                      onSelect={(date) => field.onChange(date)}
                      disabled={(date) => date < new Date('1900-01-01')}
                      autoFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Due Date */}
          <FormField
            control={form.control}
            name='due_date'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Jatuh Tempo</FormLabel>
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
                      onSelect={(date) => field.onChange(date)}
                      disabled={(date) => date < new Date('1900-01-01')}
                      autoFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Payment Term */}
          <FormField
            control={form.control}
            name='payment_term_id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Syarat Pembayaran</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className='w-full'
                      disabled={paymentTerms?.data.length === 0}
                    >
                      <SelectValue placeholder='Pilih syarat pembayaran' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {paymentTerms?.data.map((term) => (
                      <SelectItem key={term.id} value={term.id}>
                        {term.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

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
                      })) || []
                    }
                    selected={field.value || []}
                    onChange={field.onChange}
                    placeholder='Pilih tag'
                    disabled={tags?.data.length === 0}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <div className='flex flex-col space-y-4'>
          <h3 className='text-lg font-medium'>Item Invoice</h3>
          <InvoiceItemsTable fields={fields} remove={remove} form={form} />
        </div>

        {/* Invoice Items Table */}
        <div className='space-y-2'>
          <Button
            type='button'
            variant='outline'
            size='sm'
            onClick={() =>
              append({
                product_id: '',
                description: '',
                quantity: 1,
                unit_price: 0,
                tax_id: '',
                discount: 0,
                total: 0,
              })
            }
          >
            <Plus className='mr-2 h-4 w-4' /> Tambah Item
          </Button>
        </div>

        {/* Footer / Totals */}
        <div className='flex justify-end'>
          <div className='w-full space-y-2 md:w-1/3'>
            <div className='flex justify-between py-2'>
              <span className='text-muted-foreground'>Subtotal</span>
              <span>{totals.subtotal.toLocaleString()}</span>
            </div>
            <div className='flex justify-between border-b py-2'>
              <span className='text-muted-foreground'>Total Pajak</span>
              <span>{totals.taxTotal.toLocaleString()}</span>
            </div>
            <div className='flex justify-between py-2 text-lg font-bold'>
              <span>Total Invoice</span>
              <span>{totals.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className='flex justify-end gap-4'>
          <Button
            type='button'
            variant='outline'
            onClick={() => history.back()}
          >
            Batal
          </Button>
          <Button type='submit' disabled={isSubmitting} form='invoice-form'>
            {isSubmitting
              ? 'Menyimpan...'
              : isEdit
                ? 'Update Invoice'
                : 'Buat Invoice'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

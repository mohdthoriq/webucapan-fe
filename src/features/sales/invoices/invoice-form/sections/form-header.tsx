import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
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
import { MultiSelectDropdown } from '@/components/forms/multi-select-dropdown'
import { usePaymentTermsQuery } from '@/features/settings/payment-terms/hooks/use-payment-terms-query'
import { useTagsQuery } from '@/features/settings/tags/hooks/use-tags-query'
import { InvoiceFormCombobox } from '../components/invoice-form-combobox'

export function InvoiceFormHeader() {
  const { control } = useFormContext()
  const { data: paymentTerms } = usePaymentTermsQuery({ page: 1, limit: 100 })
  const { data: tags } = useTagsQuery({ page: 1, limit: 100 })

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
      <div className='col-span-1 md:col-span-2 lg:col-span-1'>
        <FormField
          control={control}
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
      </div>

      {/* Invoice Number */}
      <FormField
        control={control}
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

      {/* Currency */}
      <FormField
        control={control}
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
        control={control}
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
        control={control}
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
        control={control}
        name='payment_term_id'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Termin Pembayaran</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger
                  className='w-full'
                  disabled={paymentTerms?.data.length === 0}
                >
                  <SelectValue placeholder='Pilih termin pembayaran' />
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

      {/* Tags */}
      <div className='md:col-span-2 lg:col-span-3'>
        <FormField
          control={control}
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
    </div>
  )
}

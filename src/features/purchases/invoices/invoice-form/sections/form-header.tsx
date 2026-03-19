import { useEffect } from 'react'
import { addDays, format } from 'date-fns'
import { useFormContext, useWatch } from 'react-hook-form'
import {
  type Contact,
  FinanceNumberType,
  type PaymentTerm,
  type Tag,
} from '@/types'
import { CalendarIcon } from 'lucide-react'
import { useGlobalDialogStore } from '@/stores/global-dialog-store'
import { cn } from '@/lib/utils'
import { useDebounce } from '@/hooks/use-debounce'
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
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormShortcutButton } from '@/components/forms/form-shortcut-button'
import { MultiSelectDropdown } from '@/components/forms/multi-select-dropdown'
import { useContactTypesQuery } from '@/features/contacts/hooks/use-contacts-query'
import { usePaymentTermsQuery } from '@/features/settings/payment-terms/hooks/use-payment-terms-query'
import { useTagsQuery } from '@/features/settings/tags/hooks/use-tags-query'
import { InvoiceFormCombobox } from '../components/invoice-form-combobox'
import { useCheckFinanceNumberQuery } from '../hooks/use-invoice-form-query'

export function InvoiceFormHeader() {
  const { control, formState, setValue } = useFormContext()
  const { data: paymentTerms } = usePaymentTermsQuery({ page: 1, limit: 100 })
  const { data: tags } = useTagsQuery({ page: 1, limit: 100 })
  const { data: contactTypes } = useContactTypesQuery({ page: 1, limit: 100 })
  const { openDialog } = useGlobalDialogStore()

  const vendorTypeId = contactTypes?.data?.find(
    (type) => type.name.toLowerCase() === 'vendor'
  )?.id

  const invoiceNumber = useWatch({ control, name: 'invoice_number' })
  const paymentTermsValue = useWatch({ control, name: 'payment_term_id' })
  const invoiceDate = useWatch({ control, name: 'invoice_date' })
  const debouncedInvoiceNumber = useDebounce(invoiceNumber, 500)

  const isOriginalNumber =
    !!debouncedInvoiceNumber &&
    debouncedInvoiceNumber === (formState.defaultValues?.invoice_number ?? '')

  useEffect(() => {
    if (paymentTermsValue && paymentTerms?.data) {
      const selectedTerm = paymentTerms.data.find(
        (term) => term.id === paymentTermsValue
      )
      if (selectedTerm && invoiceDate) {
        const dueDate = addDays(new Date(invoiceDate), selectedTerm.days)
        setValue('due_date', dueDate)
      }
    }
  }, [paymentTermsValue, invoiceDate, paymentTerms, setValue])

  const {
    data: checkResult,
    isFetching: isCheckingNumber,
    isError: hasCheckError,
  } = useCheckFinanceNumberQuery({
    type: FinanceNumberType.sales_invoice,
    number: debouncedInvoiceNumber,
  })

  const numberIsTaken =
    !isOriginalNumber &&
    checkResult &&
    (checkResult.exists === true || checkResult.available === false)

  return (
    <div className='grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2 lg:grid-cols-3'>
      <div className='col-span-1 md:col-span-2 lg:col-span-1'>
        <FormField
          control={control}
          name='vendor_id'
          render={({ field }) => (
            <FormItem className='mb-0 space-y-1'>
              <FormLabel className='text-xs'>Vendor</FormLabel>
              <FormControl>
                <InvoiceFormCombobox
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value)
                  }}
                  placeholder='Pilih Vendor'
                  contactTypeId={vendorTypeId}
                  action={
                    <FormShortcutButton
                      title='Tambah Vendor Baru'
                      onClick={() =>
                        openDialog('contact', {
                          onSuccess: (data: Contact) => {
                            if (data?.id) {
                              field.onChange(data.id)
                            }
                          },
                        })
                      }
                    />
                  }
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
          <FormItem className='mb-0 space-y-1'>
            <FormLabel className='text-xs'>Nomor Invoice</FormLabel>
            <FormControl>
              <div className='relative'>
                <Input placeholder='INV-001' {...field} />
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
                    ? 'Gagal memeriksa nomor invoice'
                    : 'Nomor invoice sudah digunakan')}
              </p>
            ) : (
              <FormMessage />
            )}
          </FormItem>
        )}
      />

      {/* Currency */}
      <FormField
        control={control}
        name='currency'
        render={({ field }) => (
          <FormItem className='mb-0 space-y-1'>
            <FormLabel className='text-xs'>Mata Uang</FormLabel>
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
          <FormItem className='mb-0 flex flex-col space-y-1'>
            <FormLabel className='text-xs'>Tanggal Invoice</FormLabel>
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
          <FormItem className='mb-0 flex flex-col space-y-1'>
            <FormLabel className='text-xs'>Jatuh Tempo</FormLabel>
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
          <FormItem className='mb-0 space-y-1'>
            <FormLabel className='text-xs'>Termin Pembayaran</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Pilih termin pembayaran' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {paymentTerms?.data.length === 0 ? (
                  <div className='text-muted-foreground p-2 text-center text-sm'>
                    Tidak ada termin pembayaran
                  </div>
                ) : (
                  paymentTerms?.data.map((term) => (
                    <SelectItem key={term.id} value={term.id}>
                      {term.name}
                    </SelectItem>
                  ))
                )}
                <SelectSeparator />
                <FormShortcutButton
                  title='Tambah Termin Pembayaran Baru'
                  onClick={() =>
                    openDialog('payment-term', {
                      onSuccess: (data: PaymentTerm) => {
                        if (data?.id) {
                          field.onChange(data.id)
                        }
                      },
                    })
                  }
                />
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
            <FormItem className='mb-0 space-y-1'>
              <FormLabel className='text-xs'>Tag</FormLabel>
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
                  action={
                    <FormShortcutButton
                      title='Tambah Tag Baru'
                      onClick={() =>
                        openDialog('tag', {
                          onSuccess: (data: Tag) => {
                            if (data?.id) {
                              field.onChange(data.id)
                            }
                          },
                        })
                      }
                    />
                  }
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

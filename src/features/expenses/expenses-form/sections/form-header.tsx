import { useEffect } from 'react'
import { addDays, format } from 'date-fns'
import { useFormContext, useWatch } from 'react-hook-form'
import {
  type Account,
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
import { Switch } from '@/components/ui/switch'
import { FormShortcutButton } from '@/components/forms/form-shortcut-button'
import { MultiSelectDropdown } from '@/components/forms/multi-select-dropdown'
import { usePaymentTermsQuery } from '@/features/settings/payment-terms/hooks/use-payment-terms-query'
import { useTagsQuery } from '@/features/settings/tags/hooks/use-tags-query'
import { ExpensesFormCombobox } from '../components/expenses-form-combobox'
import { useCheckFinanceNumberQuery } from '../hooks/use-expenses-form-query'

export function ExpensesFormHeader() {
  const { control, formState, setValue } = useFormContext()
  const { data: paymentTerms } = usePaymentTermsQuery({ page: 1, limit: 100 })
  const { data: tags } = useTagsQuery({ page: 1, limit: 100 })
  const { openDialog } = useGlobalDialogStore()

  const date = useWatch({ control, name: 'date' })
  const invoiceNumber = useWatch({ control, name: 'expense_number' })
  const isPaylater = useWatch({ control, name: 'is_paylater' })
  const paymentTermId = useWatch({ control, name: 'payment_term_id' })

  useEffect(() => {
    if (!isPaylater) {
      setValue('due_date', date)
      return
    }

    if (date && paymentTermId && paymentTerms?.data) {
      const selectedTerm = paymentTerms.data.find(
        (term) => term.id === paymentTermId
      )
      if (selectedTerm) {
        const newDueDate = addDays(new Date(date), selectedTerm.days)
        setValue('due_date', newDueDate)
      }
    }
  }, [date, paymentTermId, paymentTerms?.data, setValue, isPaylater])

  const debouncedInvoiceNumber = useDebounce(invoiceNumber, 500)

  const isOriginalNumber =
    !!debouncedInvoiceNumber &&
    debouncedInvoiceNumber === (formState.defaultValues?.expense_number ?? '')

  const {
    data: checkResult,
    isFetching: isCheckingNumber,
    isError: hasCheckError,
  } = useCheckFinanceNumberQuery({
    type: FinanceNumberType.expense,
    number: debouncedInvoiceNumber,
  })

  const numberIsTaken =
    !isOriginalNumber &&
    checkResult &&
    (checkResult.exists === true || checkResult.available === false)

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
      <div className='col-span-1 flex gap-6 md:col-span-2 lg:col-span-3'>
        <FormField
          control={control}
          name='account_id'
          render={({ field }) => (
            <FormItem className='flex min-w-[300px] flex-col'>
              <FormLabel>Dibayar Dari</FormLabel>
              <FormControl>
                <ExpensesFormCombobox
                  type='account'
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder='Pilih Akun'
                  disabled={isPaylater}
                  action={
                    <FormShortcutButton
                      title='Tambah Akun Baru'
                      onClick={() =>
                        openDialog('account', {
                          onSuccess: (data: Account) => {
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

        <FormField
          control={control}
          name='is_paylater'
          render={({ field }) => (
            <FormItem className='flex flex-col justify-end pb-2'>
              <div className='flex items-center space-x-2'>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked)
                      if (checked) {
                        setValue('account_id', null)
                      } else {
                        setValue('payment_term_id', undefined)
                        setValue('due_date', date)
                      }
                    }}
                  />
                </FormControl>
                <FormLabel className='mb-0 cursor-pointer pb-0 text-sm font-normal'>
                  Bayar Nanti
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name='contact_id'
        render={({ field }) => (
          <FormItem className='flex flex-col'>
            <FormLabel>Penerima</FormLabel>
            <FormControl>
              <ExpensesFormCombobox
                type='contact'
                value={field.value}
                onValueChange={field.onChange}
                placeholder='Pilih Penerima'
                action={
                  <FormShortcutButton
                    title='Tambah Kontak Baru'
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

      <FormField
        control={control}
        name='date'
        render={({ field }) => (
          <FormItem className='flex flex-col'>
            <FormLabel>Tgl. Transaksi</FormLabel>
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

      <FormField
        control={control}
        name='expense_number'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nomor</FormLabel>
            <FormControl>
              <div className='relative'>
                <Input placeholder='EXP-001' {...field} />
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
                    ? 'Gagal memeriksa nomor'
                    : 'Nomor sudah digunakan')}
              </p>
            ) : (
              <FormMessage />
            )}
          </FormItem>
        )}
      />

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

      {isPaylater && (
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
      )}

      {isPaylater && (
        <FormField
          control={control}
          name='payment_term_id'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Termin Pembayaran</FormLabel>
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
      )}
    </div>
  )
}

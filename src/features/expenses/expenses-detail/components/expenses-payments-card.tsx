import { format } from 'date-fns'
import { type Expense } from '@/types/domain/expenses'
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
import { useTagsQuery } from '@/features/settings/tags/hooks/use-tags-query'
import { useExpensesPaymentsForm } from '../hooks/use-expenses-payments-form'
import { InvoicePaymentsCombobox } from './expenses-payments-combobox'

interface ExpensesPaymentsCardProps {
  expense: Expense
}

export function ExpensesPaymentsCard({ expense }: ExpensesPaymentsCardProps) {
  const { form, onSubmit, isSubmitting } = useExpensesPaymentsForm({
    expenseId: expense.id,
    defaultAmount: Number(expense.outstanding),
  })

  const { data: tags } = useTagsQuery({ page: 1, limit: 100 })

  if (expense.payment_status === 'paid') return null

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
              {/* Account */}
              <FormField
                control={form.control}
                name='account_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dibayar dari</FormLabel>
                    <InvoicePaymentsCombobox
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                      placeholder='Pilih akun'
                    />
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
                      <Input placeholder='Referensi pembayaran...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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

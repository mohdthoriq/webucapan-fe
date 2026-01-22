import { memo } from 'react'
import { type useForm } from 'react-hook-form'
import type { Account, Tax } from '@/types'
import { Trash2 } from 'lucide-react'
import { useGlobalDialogStore } from '@/stores/global-dialog-store'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TableCell, TableRow } from '@/components/ui/table'
import { FormShortcutButton } from '@/components/forms/form-shortcut-button'
import { InputFieldRupiah } from '@/components/forms/input-field-number-format'
import type {
  CreateExpenseFormData,
  UpdateExpenseFormData,
} from '../types/expenses-form.schema'
import { ExpensesFormCombobox } from './expenses-form-combobox'

export const ExpensesItemRow = memo(function ExpensesItemRow({
  index,
  form,
  remove,
  taxes,
}: {
  index: number
  form: ReturnType<
    typeof useForm<CreateExpenseFormData | UpdateExpenseFormData>
  >
  remove: (index: number) => void
  taxes: { data: Tax[] }
}) {
  const { openDialog } = useGlobalDialogStore()

  return (
    <TableRow>
      <TableCell>
        <FormField
          control={form.control}
          name={`expense_items.${index}.account_id`}
          render={({ field }) => (
            <FormItem>
              <ExpensesFormCombobox
                type='account'
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value)
                }}
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
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell>
        <FormField
          control={form.control}
          name={`expense_items.${index}.description`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell>
        <FormField
          control={form.control}
          name={`expense_items.${index}.tax_id`}
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value ?? undefined}
              >
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Pajak' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {taxes?.data.length === 0 ? (
                    <div className='text-muted-foreground p-2 text-center text-sm'>
                      Tidak ada data pajak
                    </div>
                  ) : (
                    taxes?.data.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.name} ({t.rate}%)
                      </SelectItem>
                    ))
                  )}
                  <SelectSeparator />
                  <FormShortcutButton
                    title='Tambah Pajak Baru'
                    onClick={() =>
                      openDialog('tax', {
                        onSuccess: (data: Tax) => {
                          if (data?.id) {
                            field.onChange(data.id)
                          }
                        },
                      })
                    }
                  />
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell>
        <FormField
          control={form.control}
          name={`expense_items.${index}.amount`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputFieldRupiah
                  placeholder='0'
                  value={field.value}
                  onValueChange={field.onChange}
                  prefix='Rp'
                  className='w-[150px] text-right'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell>
        <Button
          type='button'
          variant='ghost'
          size='icon'
          className='text-destructive'
          onClick={() => remove(index)}
        >
          <Trash2 className='h-4 w-4' />
        </Button>
      </TableCell>
    </TableRow>
  )
})

'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { DatePicker } from '@/components/forms/date-picker'
import { InputFieldRupiah } from '@/components/forms/input-field-number-format'
import { MultiSelectDropdown } from '@/components/forms/multi-select-dropdown'
import { useCashBankListForm } from '../hooks/use-cash-bank-list-form'
import { CashBankListCombobox } from './cash-bank-list-combobox'
import { useTagsQuery } from '@/features/settings/tags/hooks/use-tags-query'

type CashBankListActionDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CashBankListActionDialog({
  open,
  onOpenChange,
}: CashBankListActionDialogProps) {
  const { form, onSubmit, isSubmitting } = useCashBankListForm()
  const { data: tags } = useTagsQuery()

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        onOpenChange(state)
        form.reset()
      }}
    >
      <DialogContent className='sm:max-w-md'>
        <DialogHeader className='text-start'>
          <DialogTitle>{'Transfer Dana'}</DialogTitle>
          <DialogDescription>
            {'Transfer dana antar akun kas dan bank Anda.'}
          </DialogDescription>
        </DialogHeader>
        <div className='py-4'>
          <Form {...form}>
            <form
              id='transfer-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4'
            >
              <FormField
                control={form.control}
                name='from_account_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dari Akun</FormLabel>
                    <FormControl>
                      <CashBankListCombobox
                        type='account'
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value)
                        }}
                        placeholder='Pilih akun asal'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='to_account_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ke Akun</FormLabel>
                    <FormControl>
                      <CashBankListCombobox
                        type='account'
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder='Pilih akun tujuan'
                      />
                    </FormControl>
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

              <FormField
                control={form.control}
                name='date'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal</FormLabel>
                    <FormControl>
                      <DatePicker
                        selected={field.value}
                        onSelect={(value) => {
                          field.onChange(value)
                        }}
                        className='w-full'
                        placeholder='Pilih tanggal transfer'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jumlah</FormLabel>
                    <FormControl>
                      <InputFieldRupiah
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder='0'
                        prefix='Rp'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keterangan</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Masukkan keterangan transfer...'
                        className='min-h-[100px] resize-none'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit' form='transfer-form' disabled={isSubmitting}>
            {'Transfer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

'use client'

import type { PaymentTerm } from '@/types'
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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { usePaymentTermsForm } from '../hooks/use-payment-terms-form'

type PaymentTermsActionDialogProps = {
  currentRow?: PaymentTerm
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PaymentTermsActionDialog({
  currentRow,
  open,
  onOpenChange,
}: PaymentTermsActionDialogProps) {
  const isEdit = !!currentRow

  const { form, onSubmit, isSubmitting } = usePaymentTermsForm({
    currentRow,
  })

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        onOpenChange(state)
        form.reset()
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-start'>
          <DialogTitle>
            {isEdit ? 'Update Termin' : 'Tambah Termin'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Perbarui detail termin di sini.'
              : 'Buat termin baru untuk perusahaan Anda.'}{' '}
            Klik simpan setelah selesai.
          </DialogDescription>
        </DialogHeader>
        <div className='py-4'>
          <Form {...form}>
            <form
              id='tax-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Termin</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Masukkan nama termin...'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='days'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lama (Hari)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Masukkan lama termin pembayaran...'
                        autoComplete='off'
                        onChange={(e) => {
                          const value = e.target.valueAsNumber
                          field.onChange(isNaN(value) ? 0 : value)
                        }}
                        type='number'
                        value={field.value}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                        endAdornment={'Days'}
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
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Deskripsikan termin ini...'
                        className='min-h-[80px]'
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
          <Button type='submit' form='tax-form' disabled={isSubmitting}>
            {isEdit ? 'Update Termin' : 'Tambah Termin'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

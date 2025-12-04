'use client'

import type { Tax } from '@/types'
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
import { useTaxesForm } from '../hooks/use-taxes-form'

type TaxesActionDialogProps = {
  currentRow?: Tax
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TaxesActionDialog({
  currentRow,
  open,
  onOpenChange,
}: TaxesActionDialogProps) {
  const isEdit = !!currentRow

  const { form, onSubmit, isSubmitting } = useTaxesForm({
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
          <DialogTitle>{isEdit ? 'Update Pajak' : 'Tambah Pajak'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Perbarui detail pajak di sini.'
              : 'Buat pajak baru untuk perusahaan Anda.'}{' '}
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
                    <FormLabel>Nama Pajak</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Masukkan nama pajak...'
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
                name='rate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rate</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Masukkan rate pajak...'
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
                        placeholder='Deskripsikan pajak ini...'
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
            {isEdit ? 'Update Pajak' : 'Tambah Pajak'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

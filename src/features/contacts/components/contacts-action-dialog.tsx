'use client'

import { type Contact } from '@/types'
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
import { useContactsForm } from '../hooks/use-contacts-form'

type ContactsActionDialogProps = {
  currentRow?: Contact
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactsActionDialog({
  currentRow,
  open,
  onOpenChange,
}: ContactsActionDialogProps) {
  const isEdit = !!currentRow

  const { form, onSubmit, isSubmitting } = useContactsForm({
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
            {isEdit ? 'Update Kontak' : 'Tambah Kontak'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update kontak disini.'
              : 'Tambah kontak baru untuk Perusahaan Anda.'}
          </DialogDescription>
        </DialogHeader>
        <div className='py-4'>
          <Form {...form}>
            <form
              id='contact-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Satuan</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Masukkan nama satuan...'
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
                name='code'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kode</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='contoh:Pcs, Ft, Kg, Ltr, '
                        autoComplete='off'
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
          <Button type='submit' form='contact-form' disabled={isSubmitting}>
            {isEdit ? 'Update Kontak' : 'Tambah Kontak'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

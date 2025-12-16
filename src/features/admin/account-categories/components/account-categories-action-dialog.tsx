'use client'

import { type AccountCategory } from '@/types'
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
import { useAccountCategoriesForm } from '../hooks/use-account-categories-form'
import { Textarea } from '@/components/ui/textarea'

type AccountCategoriesActionDialogProps = {
  currentRow?: AccountCategory
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AccountCategoriesActionDialog({
  currentRow,
  open,
  onOpenChange,
}: AccountCategoriesActionDialogProps) {
  const isEdit = !!currentRow

  const { form, onSubmit, isSubmitting } = useAccountCategoriesForm({
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
            {isEdit ? 'Update Kategori Akun' : 'Tambah Kategori Akun'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update kategori akun disini.'
              : 'Tambah kategori akun baru untuk Perusahaan Anda.'}
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
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Masukkan nama kategori akun...'
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
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi Kategori Akun</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Masukkan deskripsi kategori akun...'
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
          <Button type='submit' form='contact-form' disabled={isSubmitting}>
            {isEdit ? 'Update Kategori Akun' : 'Tambah Kategori Akun'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

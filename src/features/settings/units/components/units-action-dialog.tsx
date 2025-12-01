'use client'

import { type Unit } from '@/types'
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
import { useUnitsForm } from '../hooks/use-units-form'

type UnitsActionDialogProps = {
  currentRow?: Unit
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UnitsActionDialog({
  currentRow,
  open,
  onOpenChange,
}: UnitsActionDialogProps) {
  const isEdit = !!currentRow

  const { form, onSubmit, isSubmitting } = useUnitsForm({
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
            {isEdit ? 'Update Satuan' : 'Tambah Satuan'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update satuan disini.'
              : 'Tambah satuan baru untuk Perusahaan Anda.'}
          </DialogDescription>
        </DialogHeader>
        <div className='py-4'>
          <Form {...form}>
            <form
              id='role-form'
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
          <Button type='submit' form='role-form' disabled={isSubmitting}>
            {isEdit ? 'Update Satuan' : 'Tambah Satuan'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

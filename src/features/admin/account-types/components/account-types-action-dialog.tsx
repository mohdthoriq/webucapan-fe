'use client'

import { type AccountType } from '@/types'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAccountTypesForm } from '../hooks/use-account-types-form'

type AccountTypesActionDialogProps = {
  currentRow?: AccountType
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AccountTypesActionDialog({
  currentRow,
  open,
  onOpenChange,
}: AccountTypesActionDialogProps) {
  const isEdit = !!currentRow

  const { form, onSubmit, isSubmitting } = useAccountTypesForm({
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
            {isEdit ? 'Update Tipe Akun' : 'Tambah Tipe Akun'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update tipe akun disini.'
              : 'Tambah tipe akun baru untuk Perusahaan Anda.'}
          </DialogDescription>
        </DialogHeader>
        <div className='py-4'>
          <Form {...form}>
            <form
              id='account-types-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4'
            >
              <FormField
                control={form.control}
                name='code'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kode Tipe Akun</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Masukkan kode tipe akun...'
                        autoComplete='off'
                        disabled={isEdit}
                        type='number'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipe Akun</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Masukkan nama tipe akun...'
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
                name='normal_balance'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Saldo Normal</FormLabel>
                    <FormControl>
                      <Select
                        disabled={isEdit}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Pilih saldo normal' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='debit'>Debit</SelectItem>
                          <SelectItem value='credit'>Kredit</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button
            type='submit'
            form='account-types-form'
            disabled={isSubmitting}
          >
            {isEdit ? 'Update Tipe Akun' : 'Tambah Tipe Akun'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

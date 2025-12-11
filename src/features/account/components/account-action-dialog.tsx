'use client'

import { useEffect, useRef } from 'react'
import { type Account } from '@/types'
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
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useAccountCategoriesQuery } from '@/features/admin/account-categories/hooks/use-account-categories-query'
import { useAccountTypesQuery } from '@/features/admin/account-types/hooks/use-account-types-query'
import { useAccountsForm } from '../hooks/use-account-form'
import { AccountsCombobox } from './account-combobox'

type AccountsActionDialogProps = {
  currentRow?: Account
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AccountsActionDialog({
  currentRow,
  open,
  onOpenChange,
}: AccountsActionDialogProps) {
  const isEdit = !!currentRow

  const { form, onSubmit, isSubmitting } = useAccountsForm({
    currentRow,
  })

  const { data: accountTypes } = useAccountTypesQuery()

  const typeId = form.watch('type_id')
  const { data: accountCategories } = useAccountCategoriesQuery({
    type_id: typeId,
  })

  const prevTypeIdRef = useRef(typeId)
  // Reset category when type changes
  useEffect(() => {
    if (prevTypeIdRef.current !== typeId) {
      form.setValue('category_id', '')
      prevTypeIdRef.current = typeId
    }
  }, [typeId, form])

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        onOpenChange(state)
        form.reset()
      }}
    >
      <DialogContent className='flex max-h-[80vh] flex-col sm:max-w-lg'>
        <DialogHeader className='text-start'>
          <DialogTitle>{isEdit ? 'Update Akun' : 'Tambah Akun'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update akun disini.'
              : 'Tambah akun baru untuk Perusahaan Anda.'}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[50vh] w-full px-4'>
          <div className='py-4'>
            <Form {...form}>
              <form
                id='account-form'
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
              >
                <FormField
                  control={form.control}
                  name='code'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kode Akun</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Masukkan kode akun...'
                          autoComplete='off'
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
                      <FormLabel>Nama Akun</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Masukkan nama akun...'
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
                  name='type_id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipe Akun</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Pilih tipe akun...' />
                          </SelectTrigger>
                          <SelectContent>
                            {accountTypes?.data?.map((accountType) => (
                              <SelectItem
                                key={accountType.id}
                                value={accountType.id}
                              >
                                {accountType.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='category_id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategori Akun</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                          disabled={!typeId}
                        >
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Pilih kategori akun...' />
                          </SelectTrigger>
                          <SelectContent>
                            {accountCategories?.data?.map((accountCategory) => (
                              <SelectItem
                                key={accountCategory.id}
                                value={accountCategory.id}
                              >
                                {accountCategory.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='parent_id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parent Akun</FormLabel>
                      <FormControl>
                        <AccountsCombobox
                          placeholder='Pilih parent akun...'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='allow_transaction'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Allow Transaksi</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(value === 'true')
                          }
                          value={field.value ? 'true' : 'false'}
                        >
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Pilih opsi...' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='true'>Ya</SelectItem>
                            <SelectItem value='false'>Tidak</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='is_active'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aktif</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(value === 'true')
                          }
                          value={field.value ? 'true' : 'false'}
                        >
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Pilih opsi...' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='true'>Ya</SelectItem>
                            <SelectItem value='false'>Tidak</SelectItem>
                          </SelectContent>
                        </Select>
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
                          placeholder='Masukkan deskripsi...'
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
        </ScrollArea>
        <DialogFooter>
          <Button type='submit' form='account-form' disabled={isSubmitting}>
            {isEdit ? 'Update Akun' : 'Tambah Akun'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

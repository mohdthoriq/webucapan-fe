'use client'

import { useEffect } from 'react'
import { type User } from '@/types'
import { useAuthStore } from '@/stores/auth-store'
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
import { useUsersForm } from '../hooks/use-users-form'
import { RolesCombobox } from './users-role-combobox'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2Icon } from 'lucide-react'

type UsersActionDialogProps = {
  currentRow?: User
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UsersActionDialog({
  currentRow,
  open,
  onOpenChange,
}: UsersActionDialogProps) {
  const isEdit = !!currentRow

  const { form, onSubmit, isSubmitting, errorMessage } = useUsersForm({
    currentRow,
  })
  const company = useAuthStore((state) => state.auth.user?.company)
  useEffect(() => {
    if (!isEdit && company?.id) {
      form.setValue('company_id', company.id)
    }
  }, [company?.id, isEdit, form])

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        onOpenChange(state)
        form.reset()
      }}
    >
      <DialogContent className='flex flex-col sm:max-w-lg'>
        <DialogHeader className='text-start'>
          <DialogTitle>
            {isEdit ? 'Edit Pengguna' : 'Invite Pengguna'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Edit data pengguna.'
              : 'Undang pengguna baru untuk Perusahaan Anda.'}
          </DialogDescription>
        </DialogHeader>
        <div className='py-4'>
          <Form {...form}>
            <form
              id='user-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4'
            >
              <FormField
                control={form.control}
                name='full_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Masukkan nama lengkap...'
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
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Masukkan email...'
                        autoComplete='off'
                        type='email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telepon</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Masukkan nomor telepon...'
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
                name='role_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peran</FormLabel>
                    <FormControl>
                      <RolesCombobox
                        placeholder='Pilih peran...'
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        {errorMessage && (
          <Alert variant='destructive' className='w-full'>
            <CheckCircle2Icon />
            <AlertTitle>Perhatian!</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <DialogFooter>
          <Button type='submit' form='user-form' disabled={isSubmitting}>
            {isEdit ? 'Simpan' : 'Undang'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

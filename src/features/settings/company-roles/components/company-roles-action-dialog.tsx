'use client'

import { type CompanyRole } from '@/types'
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
import { useCompanySettingsForm } from '../hooks/useCompanyRolesForm'

type CompanyRolesActionDialogProps = {
  currentRow?: CompanyRole
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CompanyRolesActionDialog({
  currentRow,
  open,
  onOpenChange,
}: CompanyRolesActionDialogProps) {
  const isEdit = !!currentRow

  const { form, onSubmit, isSubmitting } = useCompanySettingsForm({
    currentRow,
  })

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-start'>
          <DialogTitle>{isEdit ? 'Update Peran' : 'Tambah Peran'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update the role details here.'
              : 'Create a new role for your organization.'}
            Click save when you're done.
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
                    <FormLabel>Nama Peran</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='e.g., Administrator, Manager, Developer'
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
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Deskripsikan peran ini...'
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
          <Button type='submit' form='role-form' disabled={isSubmitting}>
            {isEdit ? 'Update Peran' : 'Tambah Peran'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

'use client'

import type { Tax } from '@/types'
import { CheckCircle2Icon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PERMISSION_KEY } from '@/constants/permissions'
import { useHasPermission } from '@/hooks/use-has-permission'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
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
import { UpgradePlanCard } from '@/components/upgrade-plan-card'
import { useTaxesForm } from '../hooks/use-taxes-form'

type TaxesActionDialogProps = {
  currentRow?: Tax
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: (data: Tax) => void
}

export function TaxesActionDialog({
  currentRow,
  open,
  onOpenChange,
  onSuccess,
}: TaxesActionDialogProps) {
  const isEdit = !!currentRow

  const { form, onSubmit, isSubmitting, errorMessage } = useTaxesForm({
    currentRow,
    onSuccess,
  })

  const hasPermission = useHasPermission(
    isEdit ? PERMISSION_KEY.SETTINGS_TAX_EDIT : PERMISSION_KEY.SETTINGS_TAX_ADD
  )

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
        <div className={cn('py-4', !hasPermission && 'relative')}>
          <Form {...form}>
            <form
              id='tax-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className={cn(
                'space-y-4',
                !hasPermission && 'pointer-events-none opacity-100 blur-[2px]'
              )}
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
                        disabled={!hasPermission}
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
                          field.onChange(
                            e.target.value === ''
                              ? undefined
                              : Number(e.target.value)
                          )
                        }}
                        type='number'
                        value={field.value ?? ''}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                        disabled={!hasPermission}
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
                        disabled={!hasPermission}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          {!hasPermission && (
            <UpgradePlanCard
              type='dialog'
              feature={isEdit ? 'Edit Pajak' : 'Tambah Pajak'}
            />
          )}
        </div>

        {errorMessage && (
          <Alert variant='destructive' className='w-full'>
            <CheckCircle2Icon />
            <AlertTitle>Perhatian!</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <DialogFooter>
          <Button type='submit' form='tax-form' disabled={isSubmitting}>
            {isEdit ? 'Update Pajak' : 'Tambah Pajak'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

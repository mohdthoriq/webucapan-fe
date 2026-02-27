'use client'

import type { ProductCategory } from '@/types'
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
import { useProductCategoryForm } from '../hooks/use-product-category-form'

type ProductCategoryActionDialogProps = {
  currentRow?: ProductCategory
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: (data: ProductCategory) => void
}

export function ProductCategoryActionDialog({
  currentRow,
  open,
  onOpenChange,
  onSuccess,
}: ProductCategoryActionDialogProps) {
  const isEdit = !!currentRow

  const { form, onSubmit, isSubmitting, errorMessage } = useProductCategoryForm(
    {
      currentRow,
      onSuccess,
    }
  )

  const hasPermission = useHasPermission(
    isEdit
      ? PERMISSION_KEY.PRODUCT_CATEGORY_EDIT
      : PERMISSION_KEY.PRODUCT_CATEGORY_ADD
  )

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        onOpenChange(state)
        form.reset()
      }}
    >
      <DialogContent
        className={cn(
          'flex flex-col sm:max-w-lg',
        )}
      >
        <DialogHeader
          className={cn(
            'text-start',
            !hasPermission && 'pointer-events-none opacity-100 blur-[2px]'
          )}
        >
          <DialogTitle>
            {isEdit ? 'Update Kategori Produk' : 'Tambah Kategori Produk'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update kategori produk disini.'
              : 'Tambah kategori produk baru untuk Perusahaan Anda.'}
          </DialogDescription>
        </DialogHeader>
        <div
          className={cn(
            'py-4',
            !hasPermission && 'pointer-events-none opacity-100 blur-[2px]'
          )}
        >
          <Form {...form}>
            <form
              id='account-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Kategori Produk</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Masukkan nama kategori produk...'
                        autoComplete='off'
                        type='text'
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
                        placeholder='Masukkan deskripsi...'
                        {...field}
                        className='min-h-[100px] resize-none'
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
          <Alert
            variant='destructive'
            className={cn(
              'w-full',
              !hasPermission && 'pointer-events-none opacity-100 blur-[2px]'
            )}
          >
            <CheckCircle2Icon />
            <AlertTitle>Perhatian!</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        <DialogFooter
          className={cn(
            !hasPermission && 'pointer-events-none opacity-100 blur-[2px]'
          )}
        >
          <Button type='submit' form='account-form' disabled={isSubmitting}>
            {isEdit ? 'Update Kategori' : 'Tambah Kategori'}
          </Button>
        </DialogFooter>
        <UpgradePlanCard
          feature={isEdit ? 'Update Kategori' : 'Tambah Kategori'}
        />
      </DialogContent>
    </Dialog>
  )
}

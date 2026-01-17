'use client'

import type { ProductCategory } from '@/types'
import { CheckCircle2Icon } from 'lucide-react'
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
import { useProductCategoryForm } from '../hooks/use-product-category-form'

type ProductCategoryActionDialogProps = {
  currentRow?: ProductCategory
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProductCategoryActionDialog({
  currentRow,
  open,
  onOpenChange,
}: ProductCategoryActionDialogProps) {
  const isEdit = !!currentRow

  const { form, onSubmit, isSubmitting, errorMessage } = useProductCategoryForm(
    {
      currentRow,
    }
  )

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
            {isEdit ? 'Update Kategori Produk' : 'Tambah Kategori Produk'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update kategori produk disini.'
              : 'Tambah kategori produk baru untuk Perusahaan Anda.'}
          </DialogDescription>
        </DialogHeader>
        <div className='py-4'>
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
            <Alert variant='destructive' className='w-full'>
              <CheckCircle2Icon />
              <AlertTitle>Perhatian!</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
        <DialogFooter>
          <Button type='submit' form='account-form' disabled={isSubmitting}>
            {isEdit ? 'Update Kategori' : 'Tambah Kategori'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

'use client'

import type { Tag } from '@/types'
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
import { useTagsForm } from '../hooks/use-tags-form'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2Icon } from 'lucide-react'

type TagsActionDialogProps = {
  currentRow?: Tag
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TagsActionDialog({
  currentRow,
  open,
  onOpenChange,
}: TagsActionDialogProps) {
  const isEdit = !!currentRow

  const { form, onSubmit, isSubmitting, errorMessage } = useTagsForm({ currentRow })

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
              id='tag-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Tag</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Masukkan nama tag...'
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
                    <FormLabel>Deskripsi Tag</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Masukkan deskripsi tag...'
                        autoComplete='off'
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

        {errorMessage && (
          <Alert variant='destructive' className='w-full'>
            <CheckCircle2Icon />
            <AlertTitle>Perhatian!</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <DialogFooter>
          <Button type='submit' form='tag-form' disabled={isSubmitting}>
            {isEdit ? 'Update Tag' : 'Tambah Tag'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

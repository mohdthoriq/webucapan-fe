import type { z } from 'zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { Button } from '@/components/ui/button'
import { transactionTypeSchema } from '../types/transaction-types.schema'
import { useCreateTransactionTypeMutation, useUpdateTransactionTypeMutation } from '../hooks/use-transaction-types-mutation'
import type { TransactionType } from '@/types'

interface TransactionTypesActionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: TransactionType | null
}

export function TransactionTypesActionDialog({
  open,
  onOpenChange,
  currentRow,
}: TransactionTypesActionDialogProps) {
  const isEdit = !!currentRow
  const createMutation = useCreateTransactionTypeMutation()
  const updateMutation = useUpdateTransactionTypeMutation()

  const form = useForm<z.infer<typeof transactionTypeSchema>>({
    resolver: zodResolver(transactionTypeSchema),
    defaultValues: { name: '', code: '', description: '' },
  })

  useEffect(() => {
    if (isEdit && currentRow) {
      form.reset(currentRow)
    } else {
      form.reset({
        name: '',
        code: '',
        description: '',
      })
    }
  }, [currentRow, form, isEdit, open])

  const onSubmit = async (values: z.infer<typeof transactionTypeSchema>) => {
    const formattedValues = {
      ...values,
      code: values.code
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, ''),
    }

    if (isEdit && currentRow) {
      await updateMutation.mutateAsync({ id: currentRow.id, data: formattedValues })
    } else {
      await createMutation.mutateAsync(formattedValues)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Tipe Transaksi' : 'Tambah Tipe Transaksi'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Ubah detail tipe transaksi di sini.' : 'Tambahkan tipe transaksi baru.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField control={form.control} name='code' render={({ field }) => (
              <FormItem><FormLabel>Kode</FormLabel><FormControl><Input placeholder='Contoh: sales_invoice' {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name='name' render={({ field }) => (
              <FormItem><FormLabel>Nama</FormLabel><FormControl><Input placeholder='Contoh: Penjualan Tunai' {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name='description' render={({ field }) => (
              <FormItem><FormLabel>Deskripsi</FormLabel><FormControl><Textarea placeholder='Deskripsi singkat...' {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <DialogFooter>
              <Button type='submit' disabled={createMutation.isPending || updateMutation.isPending}>{isEdit ? 'Simpan Perubahan' : 'Buat Baru'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

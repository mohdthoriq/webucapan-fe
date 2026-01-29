'use client'

import { Info, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
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
import { DatePicker } from '@/components/forms/date-picker'
import { useAccountsQuery } from '@/features/account/hooks/use-account-query'
import { useCashBankListForm } from '../hooks/use-cash-bank-list-form'

type CashBankTransferDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CashBankTransferDialog({
  open,
  onOpenChange,
}: CashBankTransferDialogProps) {
  const { form, onSubmit, isSubmitting } = useCashBankListForm()
  const { data: accountsData } = useAccountsQuery()
  const accounts = Array.isArray(accountsData) ? accountsData : []

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        onOpenChange(state)
        form.reset()
      }}
    >
      <DialogContent className='sm:max-w-2xl'>
        <DialogHeader className='flex flex-row items-center justify-between border-b pb-4'>
          <DialogTitle className='text-xl font-semibold'>
            Transfer Dana
          </DialogTitle>
          <div className='flex items-center gap-2'>
            <Button variant='outline' size='sm' className='h-8 gap-2'>
              <Info className='h-4 w-4' />
              Panduan
            </Button>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            id='transfer-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6 py-4'
          >
            <div className='grid grid-cols-1 gap-4'>
              <FormField
                control={form.control}
                name='from_account_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-1'>
                      <span className='text-destructive'>*</span> Dari
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Pilih akun asal' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {accounts.map((account) => (
                          <SelectItem key={account.id} value={account.id}>
                            {account.code} {account.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='to_account_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-1'>
                      <span className='text-destructive'>*</span> Ke
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Pilih akun tujuan' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {accounts.map((account) => (
                          <SelectItem key={account.id} value={account.id}>
                            {account.code} {account.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-3 gap-4'>
              <FormField
                control={form.control}
                name='date'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel className='mb-1 flex items-center gap-1'>
                      <span className='text-destructive'>*</span> Tanggal
                      Transaksi
                    </FormLabel>
                    <DatePicker
                      selected={field.value}
                      onSelect={field.onChange}
                      placeholder='Pilih tanggal'
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-1'>
                      <span className='text-destructive'>*</span> Total
                    </FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          type='number'
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          className='pl-3'
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel className='flex items-center gap-1'>
                  Nomor{' '}
                  <Info className='text-muted-foreground h-3 w-3 cursor-help' />
                </FormLabel>
                <FormControl>
                  <Input readOnly placeholder='TR/XXXXX' className='bg-muted' />
                </FormControl>
              </FormItem>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <FormItem>
                <FormLabel className='flex items-center gap-1'>
                  Tag{' '}
                  <Info className='text-muted-foreground h-3 w-3 cursor-help' />
                </FormLabel>
                <Select disabled>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Pilih Tag' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent />
                </Select>
              </FormItem>

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-1'>
                      Referensi{' '}
                      <Info className='text-muted-foreground h-3 w-3 cursor-help' />
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='Referensi' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='bg-card rounded-lg border p-6'>
              <h3 className='mb-4 font-semibold'>Attachment</h3>
              <div className='bg-muted/50 relative flex min-h-[150px] flex-col items-center justify-center rounded-md border-2 border-dashed p-6 text-center'>
                <div className='bg-background/60 absolute inset-0 z-10 flex items-center justify-center backdrop-blur-[1px]'>
                  <div className='bg-card flex flex-col items-center gap-4 rounded-xl border p-6 shadow-lg'>
                    <p className='text-sm font-medium'>
                      Fitur Attachment tersedia di paket{' '}
                      <span className='font-bold text-amber-500'>PRO</span>
                    </p>
                    <Button className='gap-2 bg-emerald-500 text-white hover:bg-emerald-600'>
                      <div className='flex items-center justify-center rounded-full bg-white/20 p-1'>
                        <Plus className='h-3 w-3 rotate-45' />
                      </div>
                      Upgrade Sekarang
                    </Button>
                  </div>
                </div>
                <div className='space-y-2 opacity-20'>
                  <div className='flex flex-col items-center gap-2'>
                    <div className='h-12 w-12 rounded-lg border-2 border-dashed' />
                    <p className='text-muted-foreground text-sm'>
                      Klik atau tarik file ke sini untuk mengunggah
                    </p>
                    <ul className='text-muted-foreground list-inside list-disc text-xs'>
                      <li>File size max. 5MB per upload</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Form>

        <DialogFooter className='gap-2 border-t pt-4'>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            className='gap-2'
          >
            <span className='text-lg'>×</span> Batal
          </Button>
          <Button
            type='submit'
            form='transfer-form'
            disabled={isSubmitting}
            className='gap-2 bg-blue-600 px-6 text-white hover:bg-blue-700'
          >
            <svg
              viewBox='0 0 24 24'
              className='h-4 w-4'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              <rect x='2' y='5' width='20' height='14' rx='2' />
              <line x1='2' y1='10' x2='22' y2='10' />
            </svg>
            Transfer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

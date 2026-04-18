'use client'

import { useMemo } from 'react'
import type { Account, Tag } from '@/types'
import { useGlobalDialogStore } from '@/stores/global-dialog-store'
import { cn } from '@/lib/utils'
import { PERMISSION_KEY } from '@/constants/permissions'
import { useHasPermission } from '@/hooks/use-has-permission'
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
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { DatePicker } from '@/components/forms/date-picker'
import { FormShortcutButton } from '@/components/forms/form-shortcut-button'
import { InputFieldNumberFormat } from '@/components/forms/input-field-number-format'
import { MultiSelectDropdown } from '@/components/forms/multi-select-dropdown'
import { UpgradePlanCard } from '@/components/upgrade-plan-card'
import { useTagsQuery } from '@/features/settings/tags/hooks/use-tags-query'
import type { CashBankTransactionDetail } from '../../cash-bank-detail/types/cash-bank-detail.types'
import { useCashBankListForm } from '../hooks/use-cash-bank-list-form'
import { CashBankListCombobox } from './cash-bank-list-combobox'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type CashBankListActionDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: CashBankTransactionDetail
  onSuccess?: () => void
}

export function CashBankListActionDialog({
  open,
  onOpenChange,
  currentRow,
  onSuccess,
}: CashBankListActionDialogProps) {
  const { form, onSubmit, isSubmitting } = useCashBankListForm(
    currentRow
      ? {
          id: currentRow?.id,
          from_account_id: currentRow?.account?.id || '',
          to_account_id: currentRow?.items[0]?.account?.id || '',
          tags:
            currentRow?.tags?.map((tag) =>
              typeof tag === 'object' ? tag.id : tag
            ) || [],
          amount: currentRow?.items[0]?.amount || 0,
          date: currentRow?.trans_date
            ? new Date(currentRow.trans_date)
            : new Date(),
          description: currentRow?.items[0]?.desc || '',
        }
      : undefined,
    onSuccess
  )
  const { data: tags } = useTagsQuery()
  const { openDialog } = useGlobalDialogStore()

  const hasPermission = useHasPermission(PERMISSION_KEY.CASH_BANK_TRANSFER)

  const isEdit = !!currentRow

  const currentFromAccountId = form.watch('from_account_id')
  const currentToAccountId = form.watch('to_account_id')

  // Combobox "Dari Akun" hanya mengecualikan akun yang dipilih di "Ke Akun"
  const excludeFromIds = useMemo(() => {
    const ids = new Set<string>()
    if (currentToAccountId) {
      ids.add(currentToAccountId)
    }
    return ids
  }, [currentToAccountId])

  // Combobox "Ke Akun" hanya mengecualikan akun yang dipilih di "Dari Akun"
  const excludeToIds = useMemo(() => {
    const ids = new Set<string>()
    if (currentFromAccountId) {
      ids.add(currentFromAccountId)
    }
    return ids
  }, [currentFromAccountId])

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        onOpenChange(state)
        form.reset()
      }}
    >
      <DialogContent className='sm:max-w-md'>
        <DialogHeader className='text-start'>
          <DialogTitle>
            {isEdit ? 'Ubah Transfer Dana' : 'Transfer Dana'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Ubah rincian transfer dana antar akun kas dan bank Anda.'
              : 'Transfer dana antar akun kas dan bank Anda.'}
          </DialogDescription>
        </DialogHeader>
        <div className={cn(!hasPermission && 'relative')}>
          <ScrollArea
            className={cn(
              'h-[60vh] py-4 pr-4',
              !hasPermission && 'pointer-events-none blur-[2px]'
            )}
          >
            <Form {...form}>
              <form
                id='transfer-form'
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
              >
                <FormField
                  control={form.control}
                  name='from_account_id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dari Akun</FormLabel>
                      <FormControl>
                        <CashBankListCombobox
                          type='account'
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value)
                          }}
                          placeholder='Pilih akun asal'
                          excludeIds={excludeFromIds}
                          disabled={!hasPermission}
                          codePrefix={['1-100']}
                          action={
                            <FormShortcutButton
                              title='Tambah Akun Baru'
                              onClick={() =>
                                openDialog('account', {
                                  onSuccess: (data: Account) => {
                                    if (data?.id) {
                                      field.onChange(data.id)
                                    }
                                  },
                                })
                              }
                            />
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='to_account_id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ke Akun</FormLabel>
                      <FormControl>
                        <CashBankListCombobox
                          type='account'
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder='Pilih akun tujuan'
                          excludeIds={excludeToIds}
                          disabled={!hasPermission}
                          codePrefix={['1-100']}
                          action={
                            <FormShortcutButton
                              title='Tambah Akun Baru'
                              onClick={() =>
                                openDialog('account', {
                                  onSuccess: (data: Account) => {
                                    if (data?.id) {
                                      field.onChange(data.id)
                                    }
                                  },
                                })
                              }
                            />
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='tags'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tag</FormLabel>
                      <FormControl>
                        <MultiSelectDropdown
                          options={
                            tags?.data.map((tag) => ({
                              label: tag.name,
                              value: tag.id,
                            })) || []
                          }
                          selected={field.value || []}
                          onChange={field.onChange}
                          placeholder='Pilih tag'
                          disabled={!hasPermission || tags?.data.length === 0}
                          action={
                            <FormShortcutButton
                              title='Tambah Tag Baru'
                              onClick={() =>
                                openDialog('tag', {
                                  onSuccess: (data: Tag) => {
                                    if (data?.id) {
                                      field.onChange(data.id)
                                    }
                                  },
                                })
                              }
                            />
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='date'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal</FormLabel>
                      <FormControl>
                        <DatePicker
                          selected={field.value}
                          onSelect={(value) => {
                            field.onChange(value)
                          }}
                          className='w-full'
                          placeholder='Pilih tanggal transfer'
                          disabled={!hasPermission}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='amount'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jumlah</FormLabel>
                      <FormControl>
                        <InputFieldNumberFormat
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder='0'
                          prefix='Rp'
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
                      <FormLabel className='text-xs'>
                        Referensi
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <span className='text-muted-foreground ml-1 text-[10px]'>
                                (?)
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                Catatan internal untuk mempermudah pencarian
                                (opsional)
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Masukkan keterangan transfer...'
                          className='min-h-[100px] resize-none'
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
          </ScrollArea>
          {!hasPermission && <UpgradePlanCard feature='Transfer Dana' />}
        </div>
        <DialogFooter>
          <Button
            type='submit'
            form='transfer-form'
            disabled={isSubmitting || !hasPermission}
          >
            {'Transfer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

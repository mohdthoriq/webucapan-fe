import { useFormContext } from 'react-hook-form'
import type { Contact, Tag } from '@/types'
import { useGlobalDialogStore } from '@/stores/global-dialog-store'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { DatePicker } from '@/components/forms/date-picker'
import { FormShortcutButton } from '@/components/forms/form-shortcut-button'
import { MultiSelectDropdown } from '@/components/forms/multi-select-dropdown'
import { useTagsQuery } from '@/features/settings/tags/hooks/use-tags-query'
import { CashBankListCombobox } from '../../cash-bank-list/components/cash-bank-list-combobox'

export function CashBankFormHeader({ type }: { type: 'spend' | 'receive' }) {
  const { control } = useFormContext()
  const { openDialog } = useGlobalDialogStore()
  const { data: tags } = useTagsQuery()

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {/* Contact */}
      <FormField
        control={control}
        name='contact_id'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{type === 'spend' ? 'Penerima' : 'Pembayar'}</FormLabel>
            <FormControl>
              <CashBankListCombobox
                type='contact'
                value={field.value || ''}
                onValueChange={field.onChange}
                placeholder='Pilih kontak'
                action={
                  <FormShortcutButton
                    title='Tambah Kontak Baru'
                    onClick={() =>
                      openDialog('contact', {
                        onSuccess: (data: Contact) => {
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
      {/* Date */}
      <FormField
        control={control}
        name='date'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tanggal Transaksi</FormLabel>
            <FormControl>
              <DatePicker
                selected={field.value}
                onSelect={(value) => field.onChange(value)}
                placeholder='Pilih tanggal'
                className='w-full'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Reference */}
      <FormField
        control={control}
        name='reference'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Referensi</FormLabel>
            <FormControl>
              <Input placeholder='Contoh: REF001' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
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
                disabled={tags?.data.length === 0}
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
    </div>
  )
}

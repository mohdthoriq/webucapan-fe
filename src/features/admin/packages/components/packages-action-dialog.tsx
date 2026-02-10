import { useFieldArray } from 'react-hook-form'
import { type Package } from '@/types'
import { Plus, Trash2 } from 'lucide-react'
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
import { InputFieldNumberFormat } from '@/components/forms/input-field-number-format'
import { usePackagesForm } from '../hooks/use-packages-form'

type PackagesActionDialogProps = {
  currentRow?: Package
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PackagesActionDialog({
  currentRow,
  open,
  onOpenChange,
}: PackagesActionDialogProps) {
  const isEdit = !!currentRow

  const { form, onSubmit, isSubmitting } = usePackagesForm({
    currentRow,
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'features' as never,
  })

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
          <DialogTitle>{isEdit ? 'Update Plan' : 'Tambah Plan'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update plan disini.'
              : 'Tambah plan baru untuk Aplikasi Manajerku. '}
          </DialogDescription>
        </DialogHeader>
        <div className='overflow-y-auto py-4'>
          <Form {...form}>
            <form
              id='packages-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 px-1'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Plan</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Masukkan nama plan...'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='monthly_price'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Harga Bulanan</FormLabel>
                      <FormControl>
                        <InputFieldNumberFormat
                          prefix='Rp'
                          placeholder='0'
                          value={field.value}
                          onValueChange={field.onChange}
                          className='w-[20px]'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='yearly_price'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Harga Tahunan</FormLabel>
                      <FormControl>
                        <InputFieldNumberFormat
                          prefix='Rp'
                          placeholder='0'
                          value={field.value}
                          onValueChange={field.onChange}
                          className='w-[20px]'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='space-y-2'>
                <FormLabel>Fitur - fitur</FormLabel>
                <div className='w-full space-y-2'>
                  {fields.map((field, index) => (
                    <FormField
                      key={field.id}
                      control={form.control}
                      name={`features.${index}` as never}
                      render={({ field: inputField }) => (
                        <FormItem>
                          <div className='flex w-full items-center gap-2'>
                            <FormControl className='flex-1'>
                              <Input
                                {...inputField}
                                placeholder={`Fitur ${index + 1}`}
                                className='w-full md:w-[340px]'
                              />
                            </FormControl>
                            <Button
                              type='button'
                              variant='ghost'
                              size='icon'
                              className='h-9 w-9 text-red-500'
                              onClick={() => remove(index)}
                            >
                              <Trash2 className='h-4 w-4' />
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    className='mt-2'
                    onClick={() => append('')}
                  >
                    <Plus className='h-4 w-4' />
                    Tambah Fitur
                  </Button>
                </div>
              </div>

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Masukkan deskripsi plan...'
                        autoComplete='off'
                        className='resize-none'
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
          <Button type='submit' form='packages-form' disabled={isSubmitting}>
            {isEdit ? 'Update Plan' : 'Tambah Plan'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

'use client'

import { useWatch } from 'react-hook-form'
import { FinanceNumberType, type Unit, type Product, type ProductCategory } from '@/types'
import { CheckCircle2Icon, Trash2, Upload } from 'lucide-react'
import { useDebounce } from '@/hooks/use-debounce'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
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
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { InputFieldNumberFormat } from '@/components/forms/input-field-number-format'
import { useProductCategoryQuery } from '@/features/product-categories/hooks/use-product-category-query'
import {
  useCheckFinanceNumberQuery,
  useDefaultNumberingQuery,
} from '@/features/sales/invoices/invoice-form/hooks/use-invoice-form-query'
import { useUnitsQuery } from '@/features/settings/units/hooks/use-units-query'
import { useProductsForm } from '../hooks/use-products-form'
import { FormShortcutButton } from '@/components/forms/form-shortcut-button'
import { useGlobalDialogStore } from '@/stores/global-dialog-store'

type ProductsFormContentProps = {
  currentRow?: Product | null
  onSuccess?: (data: Product) => void
}

export function ProductsFormContent({
  currentRow,
  onSuccess,
}: ProductsFormContentProps) {
  const { data: units } = useUnitsQuery()
  const { data: categories } = useProductCategoryQuery()
  const { data: productsAutoNumbering } = useDefaultNumberingQuery({
    type: FinanceNumberType.product_sku,
  })
  const {openDialog} = useGlobalDialogStore()

  const {
    form,
    onSubmit,
    fileInputRef,
    handleBoxClick,
    handleDragOver,
    handleDrop,
    uploadedFiles,
    removeFile,
    handleFileSelect,
    isSubmitting,
    existingImages,
    errorMessage,
  } = useProductsForm({
    currentRow,
    autoNumbering: productsAutoNumbering,
    onSuccess,
  })

  const { control, formState } = form

  const sku = useWatch({ control, name: 'sku' })
  const debouncedSku = useDebounce(sku, 500)

  const isOriginalNumber =
    !!debouncedSku && debouncedSku === (formState.defaultValues?.sku ?? '')

  const {
    data: checkResult,
    isFetching: isCheckingNumber,
    isError: hasCheckError,
  } = useCheckFinanceNumberQuery({
    type: FinanceNumberType.product_sku,
    number: debouncedSku,
  })

  const numberIsTaken =
    !isOriginalNumber &&
    checkResult &&
    (checkResult.exists === true || checkResult.available === false)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='sku'
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKU</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input placeholder='SKU-001' {...field} />
                    {isCheckingNumber && (
                      <div className='absolute top-1/2 right-2 -translate-y-1/2'>
                        <div className='border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent' />
                      </div>
                    )}
                  </div>
                </FormControl>
                {numberIsTaken || hasCheckError ? (
                  <p className='text-destructive text-[0.8rem] font-medium'>
                    {checkResult?.message ||
                      (hasCheckError
                        ? 'Gagal memeriksa nomor referensi'
                        : 'Nomor referensi sudah digunakan')}
                  </p>
                ) : (
                  <FormMessage />
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Produk</FormLabel>
                <FormControl>
                  <Input placeholder='Nama Produk' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='unit_id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Satuan</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Pilih satuan' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {units?.data.map((unit) => (
                      <SelectItem key={unit.id} value={unit.id}>
                        {unit.code}
                      </SelectItem>
                    ))}
                    <SelectSeparator />
                    <FormShortcutButton
                      title='Tambah Satuan Baru'
                      onClick={() =>
                        openDialog('unit', {
                          onSuccess: (data: Unit) => {
                            if (data?.id) {
                              field.onChange(data.id)
                            }
                          },
                        })
                      }
                    />
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='product_category_id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Pilih kategori' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.data.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                    <SelectSeparator />
                    <FormShortcutButton
                      title='Tambah Kategori Baru'
                      onClick={() =>
                        openDialog('product-category', {
                          onSuccess: (data: ProductCategory) => {
                            if (data?.id) {
                              field.onChange(data.id)
                            }
                          },
                        })
                      }
                    />
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='purchase_price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Harga Beli</FormLabel>
                <FormControl>
                  <InputFieldNumberFormat
                    placeholder='0'
                    value={field.value}
                    onValueChange={field.onChange}
                    prefix='Rp'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='sale_price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Harga Jual</FormLabel>
                <FormControl>
                  <InputFieldNumberFormat
                    placeholder='0'
                    value={field.value}
                    onValueChange={field.onChange}
                    prefix='Rp'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi</FormLabel>
              <FormControl>
                <Textarea placeholder='Deskripsi produk...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='taxable'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
              <div className='space-y-0.5'>
                <FormLabel className='text-base'>Pajak</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value ?? false}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className='space-y-2'>
          <FormLabel>Gambar Produk</FormLabel>
          <div
            className='border-border flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed p-8 text-center'
            onClick={handleBoxClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className='bg-muted mb-2 rounded-full p-3'>
              <Upload className='text-muted-foreground h-5 w-5' />
            </div>
            <p className='text-foreground text-sm font-medium'>
              Upload gambar produk
            </p>
            <p className='text-muted-foreground mt-1 text-sm'>
              atau,{' '}
              <span className='text-primary hover:text-primary/90 font-medium'>
                klik untuk browse
              </span>{' '}
              (4MB max)
            </p>
            <p className='text-muted-foreground mt-1 text-sm'>
              (type: JPG, JPEG, GIF, WEBP)
            </p>
            <input
              type='file'
              ref={fileInputRef}
              className='hidden'
              accept='image/*'
              multiple
              onChange={(e) => handleFileSelect(e.target.files)}
            />
          </div>

          {uploadedFiles.length > 0 && (
            <div className='mt-4 grid gap-4'>
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between rounded-md border p-2'
                >
                  <div className='flex items-center gap-2'>
                    <span className='max-w-[200px] truncate text-sm'>
                      {file.name}
                    </span>
                    <span className='text-muted-foreground text-xs'>
                      ({Math.round(file.size / 1024)} KB)
                    </span>
                  </div>
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => removeFile(index, 'new')}
                  >
                    <Trash2 className='text-destructive h-4 w-4' />
                  </Button>
                </div>
              ))}
            </div>
          )}
          {existingImages.length > 0 && (
            <div className='mt-4 grid gap-4'>
              {existingImages.map((file, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between rounded-md border p-2'
                >
                  <div className='flex items-center gap-2'>
                    <span className='max-w-[200px] truncate text-sm'>
                      {file}
                    </span>
                  </div>
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => removeFile(index, 'existing')}
                  >
                    <Trash2 className='text-destructive h-4 w-4' />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {errorMessage && (
          <Alert variant='destructive' className='w-full'>
            <CheckCircle2Icon />
            <AlertTitle>Perhatian!</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <div className='flex justify-end space-x-2'>
          <Button
            type='button'
            variant='outline'
            onClick={() => history.back()}
          >
            Batal
          </Button>
          <Button type='submit' disabled={isSubmitting}>
            {currentRow ? 'Update Produk' : 'Simpan Produk'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

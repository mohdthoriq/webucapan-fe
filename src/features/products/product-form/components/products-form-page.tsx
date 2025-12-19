'use client'

import type { Product } from '@/types'
import { Trash2, Upload } from 'lucide-react'
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
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { useProductCategoryQuery } from '@/features/product-categories/hooks/use-product-category-query'
import { useUnitsQuery } from '@/features/settings/units/hooks/use-units-query'
import { useProductsForm } from '../hooks/use-products-form'

type ProductsFormContentProps = {
  currentRow?: Product
}

export function ProductsFormContent({ currentRow }: ProductsFormContentProps) {
  const { data: units } = useUnitsQuery()
  const { data: categories } = useProductCategoryQuery()
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
    router,
  } = useProductsForm({ currentRow })

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
                  <Input placeholder='SKU-001' {...field} />
                </FormControl>
                <FormMessage />
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
                        {unit.name}
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
                  <Input
                    type='number'
                    placeholder='0'
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ''
                          ? undefined
                          : Number(e.target.value)
                      )
                    }
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
                  <Input
                    type='number'
                    placeholder='0'
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ''
                          ? undefined
                          : Number(e.target.value)
                      )
                    }
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
                    onClick={() => removeFile(index)}
                  >
                    <Trash2 className='text-destructive h-4 w-4' />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className='flex justify-end space-x-2'>
          <Button
            type='button'
            variant='outline'
            onClick={() => router.history.back()}
          >
            Batal
          </Button>
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Menyimpan...' : 'Simpan Produk'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

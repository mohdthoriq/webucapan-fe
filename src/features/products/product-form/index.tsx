'use client'

import { useLocation } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ProductsFormContent } from './components/products-form-page'
import { useProductsByIdQuery } from './hooks/use-product-query'

export function ProductsForm() {
  const location = useLocation()
  const state = location.state as { currentRowId?: string } | undefined
  const currentRowId = state?.currentRowId

  const response = useProductsByIdQuery(
    currentRowId ? { id: currentRowId } : undefined
  )
  const currentRow = response.data

  return (
    <Card>
      <CardHeader className='flex flex-row justify-between'>
        <div className='flex flex-col gap-3'>
          <CardTitle>
            {currentRow ? 'Edit Produk' : 'Tambah Produk Baru'}
          </CardTitle>
          <CardDescription>
            Isi form dibawah ini untuk menambahkan produk baru
          </CardDescription>
        </div>
        <Button variant={'link'} onClick={() => history.back()}>
          Kembali
        </Button>
      </CardHeader>
      <CardContent>
        <ProductsFormContent currentRow={currentRow} />
      </CardContent>
    </Card>
  )
}

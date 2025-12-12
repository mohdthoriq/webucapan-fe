'use client'

import { useLocation } from '@tanstack/react-router'
import type { Product } from '@/types'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ProductsFormContent } from './components/products-form-page'

export function ProductsForm() {
  const location = useLocation()
  const currentRow = (location.state as { currentRow?: Product })?.currentRow

  return (
    <Card>
      <CardHeader className='flex flex-row justify-between'>
        <div className='flex flex-col gap-3'>
          <CardTitle>Tambah Produk Baru</CardTitle>
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

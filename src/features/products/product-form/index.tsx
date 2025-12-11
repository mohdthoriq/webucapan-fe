'use client'

import { useLocation } from '@tanstack/react-router'
import type { Product } from '@/types'
import { ProductsFormContent } from './components/products-form-page'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'


export function ProductsForm() {
  const location = useLocation()
  const currentRow = (location.state as { currentRow?: Product })?.currentRow

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tambah Produk Baru</CardTitle>
        <CardDescription>
          Isi form dibawah ini untuk menambahkan produk baru
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ProductsFormContent currentRow={currentRow} />
      </CardContent>
    </Card >
  )
}

'use client'

import { getRouteApi, useLocation } from '@tanstack/react-router'
import type { Product } from '@/types'
import { ProductsProvider } from '../product-list/components/products-provider'
import { ProductsFormPageContent } from './components/products-form-page'

const route = getRouteApi('/_authenticated/products/add/')

export function ProductsForm() {
  const search = route.useSearch() as Record<string, string>
  const location = useLocation()
  const currentRow = (location.state as { currentRow?: Product })?.currentRow

  // Extract pagination parameters from URL search
  const page = search?.page ? parseInt(search.page) : undefined
  const limit = search?.limit ? parseInt(search.limit) : undefined
  const name = search?.name ? search.name : undefined

  return (
    <ProductsProvider paginationParams={{ page, limit, name }}>
      <ProductsFormPageContent currentRow={currentRow} />
    </ProductsProvider>
  )
}

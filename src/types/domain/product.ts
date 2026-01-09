import type { GlobalResponse } from '../api/global-response'
import type { ProductCategory } from './product-categories'
import type { Unit } from './unit'

export interface Product extends GlobalResponse {
  sku: string
  name: string
  description: string
  purchase_price: number
  sale_price: number
  taxable: boolean
  unit: Unit
  product_category: ProductCategory
  images: string[]
}

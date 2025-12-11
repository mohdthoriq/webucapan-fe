import ProductCategory from '@/features/product-categories'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/product-categories/')({
  component: ProductCategory,
})

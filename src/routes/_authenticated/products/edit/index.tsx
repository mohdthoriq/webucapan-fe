import { ProductsForm } from '@/features/products/product-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/products/edit/')({
  component: ProductsForm,
})

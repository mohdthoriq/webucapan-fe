import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/sales/invoices/add/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/sales/invoices/add/"!</div>
}

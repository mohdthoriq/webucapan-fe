import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/sales/invoices/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/sales/invoices/"!</div>
}

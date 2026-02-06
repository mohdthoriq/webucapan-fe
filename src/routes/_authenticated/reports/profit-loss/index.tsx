import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/reports/profit-loss/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/reports/profit-loss/"!</div>
}

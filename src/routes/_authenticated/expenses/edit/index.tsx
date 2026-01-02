import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/expenses/edit/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/expenses/edit/"!</div>
}

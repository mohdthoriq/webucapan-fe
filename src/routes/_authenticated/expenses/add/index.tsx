import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/expenses/add/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/expenses/add/"!</div>
}

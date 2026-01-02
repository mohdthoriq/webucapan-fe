import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/expenses/detail/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/expenses/detail/"!</div>
}

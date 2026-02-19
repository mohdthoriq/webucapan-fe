import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/cash-bank/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/cash-bank/edit"!</div>
}

import { createFileRoute } from '@tanstack/react-router';
import PlanPermissions from '@/features/admin/plans/components/plans-permissions'


export const Route = createFileRoute(
  '/_authenticated/admin/plans/$planId/permissions/'
)({
  component: PlanPermissions,
})
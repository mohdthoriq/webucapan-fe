import { createFileRoute } from '@tanstack/react-router';
import SubscriptionPermissions from '@/features/admin/subscriptions/components/subscription-permissions'


export const Route = createFileRoute(
  '/_authenticated/admin/subscriptions/$planId/permissions/'
)({
  component: SubscriptionPermissions,
})
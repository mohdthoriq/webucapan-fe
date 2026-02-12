import type { StatusSubscriptions } from '@/features/admin/subscriptions/types/subscriptions.schema'
import type { GlobalResponse } from '../api/global-response'
import type { Company } from './company'

export interface Subscription extends GlobalResponse {
  plan_name: string
  plan_id?: string
  start_date: Date
  end_date: Date
  Subscriptions_status: StatusSubscriptions
  company: Company
}

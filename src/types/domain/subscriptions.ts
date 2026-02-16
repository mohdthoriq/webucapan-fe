import type { StatusSubscriptions } from '@/features/admin/subscriptions/types/subscriptions.schema';
import type { GlobalResponse } from '../api/global-response';
import type { Company } from './company';
import type { Plan } from './plans';


export interface Subscription extends GlobalResponse {
  plan_name: string
  plan_id?: string
  start_date: Date
  end_date: Date | null
  status?: string
  Subscriptions_status?: StatusSubscriptions
  company?: Company
  plan?: Plan
}
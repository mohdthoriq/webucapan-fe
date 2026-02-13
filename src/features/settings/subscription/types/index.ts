import type { Subscription, Plan, Company, User } from '@/types'

export interface SubscriptionData {
  subscription: Subscription | undefined
  plan: Plan | undefined
  company: Company | undefined
  user: User | undefined
  isEmpty: boolean
}

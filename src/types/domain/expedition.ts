import type { GlobalResponse } from '../api/global-response'

export interface Expedition extends GlobalResponse {
  company_id: string
  name: string
  is_active: boolean
}

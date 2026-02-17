import type { GlobalResponse } from '../api/global-response'

export interface Company extends GlobalResponse {
  name: string
  email?: string | null
  phone?: string | null
  npwp: string
  address: string
  logo_url?: string | null
}

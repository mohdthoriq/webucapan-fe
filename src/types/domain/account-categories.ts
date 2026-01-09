import type { GlobalResponse } from '../api/global-response'

export interface AccountCategory extends GlobalResponse {
  name: string
  description: string
}

import type { GlobalResponse } from '../api/global-response'

export interface Tag extends GlobalResponse {
  name: string
  description: string
}

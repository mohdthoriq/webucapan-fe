import type { GlobalResponse } from "../api/global-response"

export interface Permission extends GlobalResponse {
  name: string
  description: string
  parent: Permission | null
  position: number
  is_parent?: boolean
}

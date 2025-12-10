import type { GlobalResponse } from "../api/global-response"

export interface MenuCategory extends GlobalResponse {
  title: string
  name: string
  position: number
  type: string
}

import type { Company } from "./company"
import type { GlobalResponse } from "../api/global-response"

export interface Unit extends GlobalResponse {
  company: Company
  name: string
  code: string
}

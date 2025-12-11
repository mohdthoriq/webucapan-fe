import type { GlobalResponse } from "../api/global-response"

export interface ContactType extends GlobalResponse {
    name: string
    description: string
}
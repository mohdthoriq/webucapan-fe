import type { GlobalResponse } from "../api/global-response";
import type { AccountCategory } from "./account-categories";
import type { Company } from "./company";

export interface Account extends GlobalResponse {
    code: string
    name: string
    allow_transaction: boolean
    is_active: boolean
    description: string
    category: AccountCategory
    parent: Account | null
    company: Company
}
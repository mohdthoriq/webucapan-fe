import type { GlobalResponse } from "../api/global-response";
import type { AccountCategory } from "./account-categories";
import type { AccountType } from "./account-types";
import type { Company } from "./company";

export interface Account extends GlobalResponse {
    code: string
    name: string
    allow_transaction: boolean
    is_active: boolean
    description: string
    type: AccountType
    category: AccountCategory
    parent: Account
    company: Company
}
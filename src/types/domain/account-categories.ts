import type { GlobalResponse } from "../api/global-response";
import type { AccountType } from "./account-types";

export interface AccountCategory extends GlobalResponse {
    name: string
    description: string
    type: AccountType
    
}

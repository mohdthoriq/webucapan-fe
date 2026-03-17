import type { GlobalResponse } from '../api/global-response'
import type { Company } from './company'
import type { ContactType } from './contact-type'

export interface Contact extends GlobalResponse {
  name: string
  type: ContactType
  company: Company
  company_name: string
  email?: string
  phone?: string
  address?: string
}

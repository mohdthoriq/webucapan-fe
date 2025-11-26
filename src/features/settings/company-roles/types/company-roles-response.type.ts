export interface CompanyRole {
  id: string
  company: {
    id: string
    name: string
    address: string
  }
  name: string
  description: string
  system_role: boolean
  created_at: Date
  updated_at: Date
}

export type CompanyRoles = CompanyRole[]

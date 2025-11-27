export interface Role {
  id: string
  name: string
  description: string
}

export interface CompanyRole extends Role {
  company: {
    id: string
    name: string
    address: string
  }
  system_role: boolean
  created_at: Date
  updated_at: Date
}

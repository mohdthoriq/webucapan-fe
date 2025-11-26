export interface Unit {
  id: string
  company: {
    id: string
    name: string
    address: string
  }
  name: string
  code: string
  created_at: Date
  updated_at: Date
}

export type Units = Unit[]

export interface Permission {
  id: string
  name: string
  description: string
  parent: Permission | null
  position: number
  is_parent?: boolean
  created_at: Date
  updated_at: Date
}

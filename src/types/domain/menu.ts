import type { Permission } from './permission'

export interface Menu {
  id: string
  title: string
  name: string
  icon: string
  url: string
  parent: Menu | null
  position: number
  permission: Permission
  is_divider?: boolean
  is_active: boolean
  created_at: Date
  updated_at: Date
}

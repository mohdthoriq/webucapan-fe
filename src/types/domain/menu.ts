import type { MenuCategory } from './menu_category'
import type { Permission } from './permission'

export interface Menu {
  // Base
  id: string
  created_at: Date
  updated_at: Date

  // Attributes
  title: string
  name: string
  icon: string
  url: string
  parent: Menu | null
  position: number
  permission: Permission
  is_divider?: boolean
  is_active: boolean
  category: MenuCategory
}

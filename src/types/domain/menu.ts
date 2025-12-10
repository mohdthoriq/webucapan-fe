import type { MenuCategory } from './menu_category'
import type { Permission } from './permission'
import type { GlobalResponse } from '../api/global-response'

export interface Menu extends GlobalResponse {
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

import type { GlobalResponse } from '../api/global-response';
import type { MenuCategory } from './menu_category';
import type { Permission } from './permission';


export interface Menu extends GlobalResponse {
  title: string
  name: string
  icon: string
  url: string
  parent: Menu | null
  parent_id: string | null
  position: number
  permission: Permission
  is_divider?: boolean
  is_active: boolean
  category: MenuCategory
  children?: Menu[]
}
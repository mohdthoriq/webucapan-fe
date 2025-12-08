export interface MenuCategory {
  // Base
  id: string
  created_at: Date
  updated_at: Date

  // Attributes
  title: string
  name: string
  position: number
  type: string
}

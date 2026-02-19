import { type PermissionTreeItem } from '@/features/admin/plans/hooks/use-permission-tree-query'

export const getAllChildIds = (children: PermissionTreeItem[]): string[] => {
  let ids: string[] = []
  children.forEach((child) => {
    ids.push(child.id)
    if (child.children.length > 0) {
      ids = [...ids, ...getAllChildIds(child.children)]
    }
  })
  return ids
}

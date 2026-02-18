import { useState } from 'react';
import { ChevronRight, ChevronDown, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { usePermissionTreeQuery, type PermissionTreeItem } from '@/features/admin/plans/hooks/use-permission-tree-query';
import { useCompanyRolePermissionsQuery, useUpdateCompanyRolePermissionsMutation } from '../hooks/use-company-role-permissions';
import { useCompanyRoles } from './company-roles-provider'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CompanyRolesPermissionsDialog({ open, onOpenChange }: Props) {
  const { currentRow } = useCompanyRoles()
  const roleId = currentRow?.id

  const { data: tree, isLoading: isTreeLoading } = usePermissionTreeQuery()
  const {
    data: roleData,
    isSuccess: isPermsSuccess,
    isLoading: isPermsLoading,
  } = useCompanyRolePermissionsQuery(roleId)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-4xl h-[80vh] flex flex-col'>
        <DialogHeader>
          <DialogTitle>Kelola Hak Akses</DialogTitle>
          <DialogDescription>
            Edit hak akses untuk peran: {currentRow?.name}
          </DialogDescription>
        </DialogHeader>

        {isTreeLoading || isPermsLoading || !isPermsSuccess || !tree ? (
          <div className='flex-1 py-4 space-y-4'>
            <Skeleton className='h-8 w-[200px]' />
            <Skeleton className='h-[300px] w-full' />
          </div>
        ) : (
          <PermissionsForm
            key={`${roleId}-${open}`}
            roleId={roleId!}
            tree={tree}
            initialSelectedIds={roleData?.role_permissions?.map((rp) => rp.permission_id) || []}
            onSuccess={() => onOpenChange(false)}
            onCancel={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

const getAllChildIds = (children: PermissionTreeItem[]): string[] => {
  let ids: string[] = []
  children.forEach((child) => {
    ids.push(child.id)
    if (child.children.length > 0) {
      ids = [...ids, ...getAllChildIds(child.children)]
    }
  })
  return ids
}

interface PermissionsFormProps {
  roleId: string
  tree: PermissionTreeItem[]
  initialSelectedIds: string[]
  onSuccess: () => void
  onCancel: () => void
}

function PermissionsForm({
  roleId,
  tree,
  initialSelectedIds,
  onSuccess,
  onCancel,
}: PermissionsFormProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds)
  const [expandedIds, setExpandedIds] = useState<string[]>([])
  const updateMutation = useUpdateCompanyRolePermissionsMutation(roleId)

  const handleToggle = (id: string, children: PermissionTreeItem[]) => {
    const allChildIds = getAllChildIds(children)
    const idsToToggle = [id, ...allChildIds]

    setSelectedIds((prev) => {
      const isSelected = prev.includes(id)
      if (isSelected) {
        return prev.filter((item) => !idsToToggle.includes(item))
      } else {
        return Array.from(new Set([...prev, ...idsToToggle]))
      }
    })
  }

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleSave = () => {
    updateMutation.mutate({ permissionIds: selectedIds }, {
      onSuccess: () => {
        onSuccess()
      },
    })
  }

  return (
    <>
      <div className='flex-1 overflow-hidden py-4'>
        <ScrollArea className='h-full pr-4'>
          <div className='space-y-4'>
            {tree.map((item: PermissionTreeItem) => (
              <PermissionItem
                key={item.id}
                item={item}
                selectedIds={selectedIds}
                expandedIds={expandedIds}
                onToggle={handleToggle}
                onExpand={toggleExpand}
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      <DialogFooter>
        <Button variant='outline' onClick={onCancel}>
          Batal
        </Button>
        <Button onClick={handleSave} disabled={updateMutation.isPending}>
          <Save className='mr-2 h-4 w-4' />
          Simpan Perubahan
        </Button>
      </DialogFooter>
    </>
  )
}

interface PermissionItemProps {
  item: PermissionTreeItem
  selectedIds: string[]
  expandedIds: string[]
  onToggle: (id: string, children: PermissionTreeItem[]) => void
  onExpand: (id: string) => void
}

function PermissionItem({
  item,
  selectedIds,
  expandedIds,
  onToggle,
  onExpand,
}: PermissionItemProps) {
  const isExpanded = expandedIds.includes(item.id)
  const isSelected = selectedIds.includes(item.id)
  const hasChildren = item.children.length > 0

  return (
    <div className='ml-4'>
      <div className='flex items-center gap-2 py-1'>
        {hasChildren ? (
          <Button
            variant='ghost'
            size='icon'
            className='h-6 w-6'
            onClick={() => onExpand(item.id)}
          >
            {isExpanded ? (
              <ChevronDown className='h-4 w-4' />
            ) : (
              <ChevronRight className='h-4 w-4' />
            )}
          </Button>
        ) : (
          <div className='w-6' />
        )}
        <Checkbox
          id={item.id}
          checked={isSelected}
          onCheckedChange={() => onToggle(item.id, item.children)}
        />
        <label
          htmlFor={item.id}
          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer'
        >
          {item.description || item.name}
        </label>
        <span className='text-xs text-muted-foreground'>({item.name})</span>
      </div>
      {hasChildren && isExpanded && (
        <div className='border-l ml-3 pl-2'>
          {item.children.map((child: PermissionTreeItem) => (
            <PermissionItem
              key={child.id}
              item={child}
              selectedIds={selectedIds}
              expandedIds={expandedIds}
              onToggle={onToggle}
              onExpand={onExpand}
            />
          ))}
        </div>
      )}
    </div>
  )
}
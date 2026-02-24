import { useState, useEffect } from 'react'
import { getRouteApi, useSearch } from '@tanstack/react-router'
import { ChevronRight, ChevronDown, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'
import {
  usePermissionTreeQuery,
  type PermissionTreeItem,
} from '../hooks/use-permission-tree-query'
import {
  usePlanPermissionsQuery,
  useUpdatePlanPermissionsMutation,
} from '../hooks/use-plan-permissions'

const route = getRouteApi('/_authenticated/admin/plans/$planId/permissions/')

export default function PlanPermissions() {
  const { planId } = route.useParams()
  const { planName } = useSearch({ strict: false }) as { planName: string }
  const { data: tree, isLoading: isTreeLoading } = usePermissionTreeQuery()
  const {
    data: currentPermissions,
    isSuccess: isPermsSuccess,
    isLoading: isPermsLoading,
  } = usePlanPermissionsQuery(planId)
  const updateMutation = useUpdatePlanPermissionsMutation(planId)

  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [expandedIds, setExpandedIds] = useState<string[]>([])

  useEffect(() => {
    if (isPermsSuccess && currentPermissions) {
      const timer = setTimeout(() => {
        setSelectedIds(currentPermissions)
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [isPermsSuccess, currentPermissions])

  const handleToggle = (id: string, children: PermissionTreeItem[] = []) => {
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

  const getAllChildIds = (children?: PermissionTreeItem[]): string[] => {
    if (!children) return []
    let ids: string[] = []
    children.forEach((child) => {
      ids.push(child.id)
      if (child.children && child.children.length > 0) {
        ids = [...ids, ...getAllChildIds(child.children)]
      }
    })
    return ids
  }

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleSave = () => {
    updateMutation.mutate(selectedIds)
  }

  if (isTreeLoading || isPermsLoading) {
    return (
      <div className='space-y-4 p-4'>
        <Skeleton className='h-8 w-[200px]' />
        <Skeleton className='h-[400px] w-full' />
      </div>
    )
  }

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between'>
        <div>
          <CardTitle>Manage Permissions</CardTitle>
          <CardDescription>
            Edit permissions for plan: {planName}
          </CardDescription>
        </div>
        <div className='flex gap-2'>
          <Button variant='outline' onClick={() => history.go(-1)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={updateMutation.isPending}>
            <Save className='mr-2 h-4 w-4' />
            Save Changes
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {tree?.map((item: PermissionTreeItem) => (
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
      </CardContent>
    </Card>
  )
}

interface PermissionItemProps {
  item: PermissionTreeItem
  selectedIds: string[]
  expandedIds: string[]
  onToggle: (id: string, children?: PermissionTreeItem[]) => void
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
  const hasChildren = item.children && item.children.length > 0

  return (
    <div className='ml-4'>
      <div className='flex items-center gap-2 py-2'>
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
          className='cursor-pointer text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        >
          {item.description || item.name}
        </label>
        <span className='text-muted-foreground text-xs'>({item.name})</span>
      </div>
      {hasChildren && isExpanded && item.children && (
        <div className='ml-3 border-l pl-2'>
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

import { useState } from 'react'
import { useNavigate, useLocation } from '@tanstack/react-router'
import { ChevronRight, ChevronDown, Save, ArrowLeft, CheckCircle2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { usePermissionTreeQuery, type PermissionTreeItem } from '@/features/admin/plans/hooks/use-permission-tree-query'
import { useUpdateCompanyRolePermissionsMutation, useCompanyRolePermissionsQuery } from '../hooks/use-company-role-permissions'
import { useCompanySettingsForm } from '../hooks/use-company-roles-form'
import { toast } from 'sonner'
import type { CreateCompanyRoleSettingsFormData } from '../types/company-roles.schema'
import { type CompanyRole } from '@/types'

export function RoleFormPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as { currentRowId?: string } | undefined
  const currentRowId = state?.currentRowId
  const isEdit = !!currentRowId

  const { data: roleWithPermissions, isLoading: isRoleLoading } = useCompanyRolePermissionsQuery(currentRowId)
  
  const { form, onSubmit, isSubmitting, errorMessage } = useCompanySettingsForm({
    currentRow: roleWithPermissions as CompanyRole | undefined
  })
  
  const { data: tree, isLoading: isTreeLoading } = usePermissionTreeQuery()
  
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [expandedIds, setExpandedIds] = useState<string[]>([])
  const [prevRoleId, setPrevRoleId] = useState<string | undefined>(undefined)

  if (roleWithPermissions && roleWithPermissions.id !== prevRoleId) {
    setPrevRoleId(roleWithPermissions.id)
    const perms = roleWithPermissions.role_permissions?.map(p => p.permission_id) || []
    setSelectedIds(perms)
  }

  const updatePermissionsMutation = useUpdateCompanyRolePermissionsMutation()

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

  const handleSaveAll = async (data: CreateCompanyRoleSettingsFormData) => {
    try {
      // 1. Create or Update the role
      const response = await onSubmit(data)
      const roleId = isEdit ? currentRowId : response?.data?.id

      if (roleId) {
        // 2. Update permissions
        await updatePermissionsMutation.mutateAsync({
          id: roleId,
          permissionIds: selectedIds
        })
        
        toast.success(isEdit ? 'Peran dan hak akses berhasil diperbarui.' : 'Peran dan hak akses berhasil disimpan.')
        navigate({ to: '/settings/company-roles' })
      }
    } catch (_) {
      toast.error('Gagal menyimpan peran atau hak akses.')
    }
  }

  if (isEdit && isRoleLoading) {
    return (
      <div className='flex-1 p-8 space-y-4'>
        <Skeleton className='h-8 w-1/4' />
        <div className='grid gap-4 md:grid-cols-2'>
          <Skeleton className='h-[400px]' />
          <Skeleton className='h-[400px]' />
        </div>
      </div>
    )
  }

  return (
    <div className='flex-1 space-y-4 p-4 md:p-8 pt-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Button variant='ghost' size='icon' onClick={() => navigate({ to: '/settings/company-roles' })}>
            <ArrowLeft className='h-4 w-4' />
          </Button>
          <h2 className='text-3xl font-bold tracking-tight'>
            {isEdit ? 'Edit Peran' : 'Tambah Peran Baru'}
          </h2>
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <Card className='flex flex-col'>
          <CardHeader>
            <CardTitle>Detail Peran</CardTitle>
            <CardDescription>
              {isEdit ? 'Ubah nama dan deskripsi untuk peran ini.' : 'Tentukan nama dan deskripsi untuk peran baru ini.'}
            </CardDescription>
          </CardHeader>
          <CardContent className='flex-1'>
            <Form {...form}>
              <form id='role-form' onSubmit={form.handleSubmit(handleSaveAll)} className='space-y-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Peran</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='e.g., Administrator, Manager, Developer'
                          autoComplete='off'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Deskripsikan peran ini...'
                          className='min-h-[100px]'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            {errorMessage && (
              <Alert variant='destructive' className='mt-4'>
                <CheckCircle2Icon />
                <AlertTitle>Perhatian!</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card className='flex flex-col h-[600px]'>
          <CardHeader>
            <CardTitle>Hak Akses</CardTitle>
            <CardDescription>
              Pilih hak akses yang akan diberikan ke peran ini.
            </CardDescription>
          </CardHeader>
          <CardContent className='flex-1 overflow-hidden'>
            {isTreeLoading ? (
              <div className='space-y-4'>
                <Skeleton className='h-8 w-[200px]' />
                <Skeleton className='h-[300px] w-full' />
              </div>
            ) : (
              <ScrollArea className='h-full pr-4'>
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
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>

      <div className='flex justify-end gap-2'>
        <Button variant='outline' onClick={() => navigate({ to: '/settings/company-roles' })}>
          Batal
        </Button>
        <Button 
          type='submit' 
          form='role-form' 
          disabled={isSubmitting || updatePermissionsMutation.isPending}
        >
          <Save className='mr-2 h-4 w-4' />
          {isEdit ? 'Perbarui Peran & Hak Akses' : 'Simpan Peran & Hak Akses'}
        </Button>
      </div>
    </div>
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

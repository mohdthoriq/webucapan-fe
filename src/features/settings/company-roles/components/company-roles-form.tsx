import { useState } from 'react'
import { useNavigate, useLocation } from '@tanstack/react-router'
import { Save, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { usePermissionTreeQuery } from '@/features/admin/plans/hooks/use-permission-tree-query'
import { useCompanyRolePermissionsQuery } from '../hooks/use-company-role-permissions'
import { useCompanySettingsForm } from '../hooks/use-company-roles-form'
import { toast } from 'sonner'
import type { CreateCompanyRoleSettingsFormData } from '../types/company-roles.schema'
import { type CompanyRole } from '@/types'
import { CompanyRolesFormDetails } from './company-roles-form-details'
import { CompanyRolesFormPermissions } from './company-roles-form-permissions'
import { CompanyRolesFormSkeleton } from './company-roles-form-skeleton'

export function CompanyRolesForm() {
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
  
  const [expandedIds, setExpandedIds] = useState<string[]>([])

  const selectedIds = form.watch('permission_ids') || []
  const setSelectedIds = (val: React.SetStateAction<string[]>) => {
    const nextVal = typeof val === 'function' ? (val as (prev: string[]) => string[])(selectedIds) : val
    form.setValue('permission_ids', nextVal, { shouldDirty: true, shouldValidate: true })
  }

  const handleSaveAll = async (data: CreateCompanyRoleSettingsFormData) => {
    try {
      await onSubmit(data)
      
      toast.success(isEdit ? 'Peran berhasil diperbarui.' : 'Peran berhasil disimpan.')
      navigate({ to: '/settings/company-roles' })
    } catch (_) {
      // Errors are handled by the hooks
    }
  }

  if (isEdit && isRoleLoading) {
    return <CompanyRolesFormSkeleton />
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Button 
            variant='ghost' 
            size='icon' 
            onClick={() => navigate({ to: '/settings/company-roles' })}
          >
            <ArrowLeft className='h-4 w-4' />
          </Button>
          <h2 className='text-3xl font-bold tracking-tight'>
            {isEdit ? 'Edit Peran' : 'Tambah Peran Baru'}
          </h2>
        </div>
      </div>

      <Form {...form}>
        <form id='role-form' onSubmit={form.handleSubmit(handleSaveAll)} className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2'>
            <CompanyRolesFormDetails 
              form={form} 
              isEdit={isEdit} 
              errorMessage={errorMessage} 
            />

            <CompanyRolesFormPermissions 
              tree={tree}
              isLoading={isTreeLoading}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
              expandedIds={expandedIds}
              setExpandedIds={setExpandedIds}
            />
          </div>

          <div className='flex justify-end gap-2'>
            <Button 
              variant='outline' 
              type='button'
              onClick={() => navigate({ to: '/settings/company-roles' })}
            >
              Batal
            </Button>
            <Button 
              type='submit' 
              disabled={isSubmitting}
            >
              <Save className='mr-2 h-4 w-4' />
              {isEdit ? 'Perbarui Peran & Hak Akses' : 'Simpan Peran & Hak Akses'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

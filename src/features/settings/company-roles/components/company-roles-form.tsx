import { useState } from 'react'
import { useNavigate, useLocation } from '@tanstack/react-router'
import { CheckCircle2Icon, Save } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import { usePermissionTreeQuery } from '@/features/admin/plans/hooks/use-permission-tree-query'
import { useCompanyRolePermissionsQuery } from '../hooks/use-company-role-permissions'
import { useCompanySettingsForm } from '../hooks/use-company-roles-form'
import { CompanyRolesFormDetails } from './company-roles-form-details'
import { CompanyRolesFormPermissions } from './company-roles-form-permissions'


import type { CreateCompanyRoleSettingsFormData } from '../types/company-roles.schema'
import { type CompanyRole } from '@/types'

export function CompanyRolesForm() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const state = location.state as { currentRowId?: string } | undefined
  const currentRowId = state?.currentRowId
  const isEdit = !!currentRowId

  const { data: roleWithPermissions, isLoading: isRoleLoading } = useCompanyRolePermissionsQuery(currentRowId)
  const { data: tree, isLoading: isTreeLoading } = usePermissionTreeQuery()
  
  const { form, onSubmit, isSubmitting, errorMessage } = useCompanySettingsForm({
    currentRow: roleWithPermissions as CompanyRole | undefined
  })
  
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
      // Error ditangani oleh hook useCompanySettingsForm (errorMessage)
    }
  }

  if (isEdit && isRoleLoading) {
    return (
      <Card className='mb-8'>
        <CardHeader>
          <CardTitle>Memuat data peran...</CardTitle>
        </CardHeader>
        <CardContent className='flex h-40 items-center justify-center font-medium'>
          Mohon tunggu sebentar...
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className='mb-8'>
      <CardHeader>
        <CardTitle>
          <div className='flex items-center justify-between'>
            {isEdit ? 'Edit Peran' : 'Tambah Peran Baru'}
            <Button variant='link' onClick={() => history.back()}>
              Kembali
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form 
            id='role-form' 
            onSubmit={form.handleSubmit(handleSaveAll)} 
            className='space-y-8'
          >
            <div className='grid gap-8 lg:grid-cols-2 lg:items-start'>
              <div className='space-y-6'>
                <CompanyRolesFormDetails 
                  form={form} 
                  isEdit={isEdit} 
                />
              </div>

              <div className='space-y-6'>
                <CompanyRolesFormPermissions 
                  tree={tree}
                  isLoading={isTreeLoading}
                  selectedIds={selectedIds}
                  setSelectedIds={setSelectedIds}
                  expandedIds={expandedIds}
                  setExpandedIds={setExpandedIds}
                />
              </div>
            </div>

            <div className='bg-border h-px' />

            {errorMessage && (
              <Alert variant='destructive' className='w-full'>
                <CheckCircle2Icon className='h-4 w-4' />
                <AlertTitle>Perhatian!</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            <div className='flex justify-end gap-3'>
              <Button 
                variant='outline' 
                type='button'
                disabled={isSubmitting}
                onClick={() => navigate({ to: '/settings/company-roles' })}
              >
                Batal
              </Button>
              <Button 
                type='submit' 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  'Menyimpan...'
                ) : (
                  <>
                    <Save className='mr-2 h-4 w-4' />
                    {isEdit ? 'Perbarui Peran' : 'Simpan Peran'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
import { ConfirmDialog } from '@/components/dialog/confirm.dialog'
import { useDeleteCompanyRoleMutation } from '../hooks/use-company-roles-mutation'
import { CompanyRolesActionDialog } from './company-roles-action-dialog'
import { CompanyRolesDetailDialog } from './company-roles-detail-dialog'
import { CompanyRolesPermissionsDialog } from './company-roles-permissions-dialog'
import { useCompanyRoles } from './company-roles-provider'

export function CompanyRolesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useCompanyRoles()

  const { mutate: deleteRole, isPending } = useDeleteCompanyRoleMutation()

  return (
    <>
      <CompanyRolesActionDialog
        key='role-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <CompanyRolesActionDialog
            key={`role-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <CompanyRolesDetailDialog
            key={`role-view-${currentRow.id}`}
            open={open === 'view'}
            onOpenChange={() => {
              setOpen('view')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <CompanyRolesPermissionsDialog
            key={`role-permissions-${currentRow.id}`}
            open={open === 'permissions'}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setOpen(null)
                setTimeout(() => {
                  setCurrentRow(null)
                }, 500)
              }
            }}
          />

          <ConfirmDialog
            key={`role-delete-${currentRow.id}`}
            destructive
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            handleConfirm={() => {
              deleteRole({
                id: currentRow.id,
              })
              setOpen(null)
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            disabled={isPending}
            className='max-w-md'
            title={`Hapus peran "${currentRow.name}" ?`}
            desc={
              <>
                Tindakan ini tidak dapat dibatalkan. Ini akan menghapus secara
                permanen peran{' '}
                <span className='text-foreground font-semibold'>
                  "{currentRow.name}"
                </span>{' '}
                dari perusahaan Anda.
              </>
            }
            confirmText={`${isPending ? 'Deleting...' : 'Delete'}`}
          />
        </>
      )}
    </>
  )
}

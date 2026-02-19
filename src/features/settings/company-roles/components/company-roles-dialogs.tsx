import { ConfirmDialog } from '@/components/dialog/confirm.dialog'
import { useDeleteCompanyRoleMutation } from '../hooks/use-company-roles-mutation'
import { CompanyRolesDetailDialog } from './company-roles-detail-dialog'
import { useCompanyRoles } from './company-roles-provider'

export function CompanyRolesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useCompanyRoles()

  const { mutate: deleteRole, isPending } = useDeleteCompanyRoleMutation()

  return (
    <>

      {currentRow && (
        <>
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

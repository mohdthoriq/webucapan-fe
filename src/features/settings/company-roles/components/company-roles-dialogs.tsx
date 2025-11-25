import { CompanyRolesActionDialog } from './company-roles-action-dialog'
import { useCompanyRoles } from './company-roles-provider'

export function CompanyRolesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useCompanyRoles()

  return (
    <>
      <CompanyRolesActionDialog
        key='role-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
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
      )}
    </>
  )
}

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { type CompanyRole } from '../types/company-roles-response.type'

type CompanyRolesDetailDialogProps = {
  currentRow: CompanyRole
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CompanyRolesDetailDialog({
  currentRow,
  open,
  onOpenChange,
}: CompanyRolesDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Role Details</DialogTitle>
          <DialogDescription>
            Detailed information about the selected role.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4'>
          <div>
            <h4 className='text-muted-foreground text-sm font-medium'>
              Role Name
            </h4>
            <p className='text-sm font-medium'>{currentRow.name}</p>
          </div>
          <div>
            <h4 className='text-muted-foreground text-sm font-medium'>
              Description
            </h4>
            <p className='text-sm'>{currentRow.description || '-'}</p>
          </div>
          <div>
            <h4 className='text-muted-foreground text-sm font-medium'>
              Company Name
            </h4>
            <p className='text-sm'>{currentRow.company?.name || '-'}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

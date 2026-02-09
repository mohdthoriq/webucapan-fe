import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useAuthStore } from '@/stores/auth-store'
import { useLayout } from '@/context/layout-provider'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'
import { Button } from '../ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'
import { AppTitle } from './app-title'
import { sidebarData } from './data/sidebar-data'
import { sidebarDataAdmin } from './data/sidebar-data-admin'
import { NavGroup } from './nav-group'

export function AppSidebar() {
  const { collapsible, variant } = useLayout()
  const { state, toggleSidebar } = useSidebar()
  const {
    auth: { user },
  } = useAuthStore()

  const data =
    user?.role?.name === 'superadmin' ? sidebarDataAdmin : sidebarData

  return (
    <Sidebar collapsible={collapsible} variant={variant}>
      <SidebarHeader>
        <div className='flex items-center justify-between px-2'>
          <AppTitle />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {data.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter className='border-t'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant='ghost'
                onClick={toggleSidebar}
                className='w-full justify-center'
              >
                {state === 'collapsed' ? (
                  <ArrowRight className='h-4 w-4' />
                ) : (
                  <ArrowLeft className='h-4 w-4' />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle Sidebar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

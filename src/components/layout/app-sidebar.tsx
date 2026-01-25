import { useAuthStore } from '@/stores/auth-store'
import { useLayout } from '@/context/layout-provider'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { AppTitle } from './app-title'
import { sidebarData } from './data/sidebar-data'
import { sidebarDataAdmin } from './data/sidebar-data-admin'
import { NavGroup } from './nav-group'

export function AppSidebar() {
  const { collapsible, variant } = useLayout()
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
          <SidebarTrigger className='-mr-2 ml-auto hidden md:flex' />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {data.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

import { useAuthStore } from '@/stores/auth-store'
import { useLayout } from '@/context/layout-provider'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { AppTitle } from './app-title'
import { sidebarData } from './data/sidebar-data'
import { sidebarDataAdmin } from './data/sidebar-data-admin'
import { NavGroup } from './nav-group'
import { NavUser } from './nav-user'

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
        </div>
      </SidebarHeader>
      <SidebarContent>
        {data.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

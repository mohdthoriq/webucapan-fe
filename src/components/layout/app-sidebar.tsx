import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useAuthStore } from '@/stores/auth-store'
import { cn } from '@/lib/utils'
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
import { AppTitle } from './app-title'
import { sidebarData } from './data/sidebar-data'
import { sidebarDataAdmin } from './data/sidebar-data-admin'
import { NavGroup } from './nav-group'

// import { transformMenusToSidebarData } from './utils/menu-utils'

export function AppSidebar() {
  const { collapsible, variant } = useLayout()
  const { state, toggleSidebar } = useSidebar()
  const {
    auth: { user },
  } = useAuthStore()

  // const data = useMemo(() => {
  //   if (user?.menus && user.menus.length > 0) {
  //     return transformMenusToSidebarData(user.menus)
  //   } else if (user?.role?.name === 'superadmin') {
  //     return sidebarDataAdmin
  //   }
  // }, [user])

  const data =
    user?.role?.name === 'superadmin' ? sidebarDataAdmin : sidebarData
  return (
    <Sidebar collapsible={collapsible} variant={variant}>
      <SidebarHeader>
        <div
          className={cn(
            'flex items-center transition-all duration-200',
            'group-data-[collapsible=icon]:pt-2'
          )}
        >
          <AppTitle />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {data?.navGroups?.map((group) => (
          <NavGroup key={group.title} {...group} />
        ))}
      </SidebarContent>
      <SidebarFooter className='border-t'>
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
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

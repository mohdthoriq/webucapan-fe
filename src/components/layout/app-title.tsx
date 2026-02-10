import { Link } from '@tanstack/react-router'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

import FullLogo from '@/assets/manajerku-office.png'
import IconLogo from '@/assets/manajerku-logo.png'
import { cn } from '@/lib/utils'

export function AppTitle() {
  const { setOpenMobile, state } = useSidebar()
  const isExpanded = state === 'expanded'

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size='lg'
          asChild
          className={cn(
            "hover:bg-transparent active:bg-transparent transition-all duration-200",
            "w-full h-auto", 
            "group-data-[collapsible=icon]:size-auto! group-data-[collapsible=icon]:p-0!"
          )}
        >
          <Link
            to='/'
            onClick={() => setOpenMobile(false)}
            className='flex w-full items-center justify-center'
          >
            <img 
              src={isExpanded ? FullLogo : IconLogo} 
              alt="Manajerku"
              className={cn(
                "object-contain transition-all duration-200",
                // When expanded, let it take up the available width (adjust h- as needed)
                isExpanded ? "h-10 w-full rounded-md" : "h-8 w-8 rounded-md"
              )}
            />
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
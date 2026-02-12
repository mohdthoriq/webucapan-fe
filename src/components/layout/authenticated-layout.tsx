import { type ReactNode } from 'react'
import { Outlet } from '@tanstack/react-router'
import { getCookie } from '@/lib/cookies'
import { cn } from '@/lib/utils'
import { LayoutProvider } from '@/context/layout-provider'
import { SearchProvider } from '@/context/search-provider'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { SkipToMain } from '@/components/skip-to-main'
import { ProfileDropdown } from '../profile-dropdown'
import { GlobalDialogProvider } from '../providers/global-dialog-provider'
import { Search } from '../search'
import { ThemeSwitch } from '../theme-switch'
import { Header } from './header'
import { Main } from './main'

type AuthenticatedLayoutProps = {
  children?: ReactNode
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const defaultOpen = getCookie('sidebar_state') !== 'false'

  return (
    <SearchProvider>
      <GlobalDialogProvider />
      <LayoutProvider>
        <SidebarProvider defaultOpen={defaultOpen}>
          <SkipToMain />
          <AppSidebar />
          <SidebarInset
            className={cn(
              // Set content container, so we can use container queries
              '@container/content',

              // If layout is fixed, set the height
              // to 100svh to prevent overflow
              'has-data-[layout=fixed]:h-svh',

              // If layout is fixed and sidebar is inset,
              // set the height to 100svh - spacing (total margins) to prevent overflow
              'peer-data-[variant=inset]:has-data-[layout=fixed]:h-[calc(100svh-(var(--spacing)*4))]'
            )}
          >
            {/* ===== Top Heading ===== */}
            <Header fixed>
              <SidebarTrigger className='md:hidden' />
              <Search />
              <div className='ms-auto flex items-center space-x-4'>
                <ThemeSwitch />
                <ProfileDropdown />
              </div>
            </Header>

            <Main className='flex flex-1 flex-col'>
              {children ?? <Outlet />}
            </Main>
          </SidebarInset>
        </SidebarProvider>
      </LayoutProvider>
    </SearchProvider>
  )
}

import { ContactRound, LayoutDashboard, Settings, WalletCards } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: 'Kontak',
          url: '/contacts',
          icon: ContactRound,
        },
        {
          title: 'Settings',
          url: '/settings',
          icon: Settings,
        },
        {
          title: 'Akun',
          icon: WalletCards,
          url: '/account',
        }
      ],
    },
  ],
}

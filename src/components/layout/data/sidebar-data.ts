import { BuildingIcon, ContactRound, LayoutDashboard, Settings, Wallet, WalletCards, WalletMinimal } from 'lucide-react'
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
          icon: BuildingIcon,
          items: [
            {
              title: 'Tipe Akun',
              url: '/account/account-types',
              icon: WalletMinimal,
            },
            {
              title: 'Kategori Akun',
              url: '/account/account-categories',
              icon:  Wallet,
            },
            {
              title: 'Akun',
              url: '/account/account',
              icon: WalletCards,
            },
          ],
        }
      ],
    },
  ],
}

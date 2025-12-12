import {
  ContactRound,
  GalleryHorizontalEnd,
  LayoutDashboard,
  Settings,
  Store,
  WalletCards,
} from 'lucide-react'
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
          title: 'Produk',
          icon: Store,
          items: [
            {
              title: 'Kategori',
              url: '/product-categories',
              icon: GalleryHorizontalEnd,
            },
            {
              title: 'Produk',
              url: '/products',
              icon: Store,
            },
          ],
        },
        {
          title: 'Kontak',
          url: '/contacts',
          icon: ContactRound,
        },
        {
          title: 'Akun',
          icon: WalletCards,
          url: '/account',
        },
        {
          title: 'Settings',
          url: '/settings',
          icon: Settings,
        },
      ],
    },
  ],
}

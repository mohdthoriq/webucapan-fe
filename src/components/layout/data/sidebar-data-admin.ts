import {
  Library,
  Package,
  CreditCard,
  ShieldCheck,
  Menu,
  LayoutDashboard,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarDataAdmin: SidebarData = {
  navGroups: [
    {
      title: 'Overview',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: 'Akuntansi',
      items: [
        {
          title: 'Kategori Akun',
          icon: Library,
          url: '/admin/account-categories',
        },
      ],
    },
    {
      title: 'Penagihan & Berlangganan',
      items: [
        {
          title: 'Paket',
          icon: Package,
          url: '/admin/packages',
        },
        {
          title: 'Langganan',
          icon: CreditCard,
          url: '/admin/subscriptions',
        },
      ],
    },
    {
      title: 'Akses Kontrol',
      items: [
        {
          title: 'Permissions',
          url: '/admin/permissions',
          icon: ShieldCheck,
        },
      ],
    },
    {
      title: 'Pengaturan',
      items: [
        {
          title: 'Menus',
          url: '/admin/menus',
          icon: Menu,
        },
      ],
    },
  ],
}

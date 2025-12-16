import { AppWindow, KeyRound, LayoutDashboard, WalletCards } from 'lucide-react';
import { type SidebarData } from '../types';


export const sidebarDataAdmin: SidebarData = {
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
          title: 'Permissions',
          url: '/admin/permissions',
          icon: KeyRound,
        },
        {
          title: 'Menus',
          url: '/admin/menus',
          icon: AppWindow,
        },
        {
          title: 'Akun',
          icon: WalletCards,
          url: '/admin/account-categories'
        },
      ],
    },
  ],
}
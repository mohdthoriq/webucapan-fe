import { Library, Package, CreditCard, ShieldCheck, Menu, LayoutDashboard } from 'lucide-react';
import { type SidebarData } from '../types';


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
      title: 'Accounting',
      items: [
        {
          title: 'Account Categories',
          icon: Library,
          url: '/admin/account-categories',
        },
      ],
    },
    {
      title: 'Billing & Subscriptions',
      items: [
        {
          title: 'Plan',
          icon: Package,
          url: '/admin/plans',
        },
        {
          title: 'Subscriptions',
          icon: CreditCard,
          url: '/admin/subscriptions',
        },
      ],
    },
    {
      title: 'Access Control',
      items: [
        {
          title: 'Permissions',
          url: '/admin/permissions',
          icon: ShieldCheck,
        },
      ],
    },
    {
      title: 'Settings',
      items: [
        {
          title: 'Menus',
          url: '/admin/menus',
          icon: Menu,
        },
        {
          title: 'Menu Categories',
          url: '/admin/menu-categories',
          icon: Library,
        },
      ],
    },
  ],
}
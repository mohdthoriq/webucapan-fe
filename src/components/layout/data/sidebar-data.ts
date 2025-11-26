import { LayoutDashboard, Settings, Ruler, Building2 } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'amfibiz',
    email: 'owner@amfibiz.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
        // {
        //   title: 'Tasks',
        //   url: '/tasks',
        //   icon: ListTodo,
        // },
        // {
        //   title: 'Users',
        //   url: '/users',
        //   icon: Users,
        // },
        {
          title: 'Settings',
          url: '/settings',
          icon: Settings,
        },
        {
          title: 'Master Data',
          icon: Building2,
          items: [
            {
              title: 'Units',
              url: '/settings/units',
              icon: Ruler,
            },
          ],
        },
      ],
    },
  ],
}

import { ContactRound, FileText, GalleryHorizontalEnd, LayoutDashboard, Settings, ShoppingBasket, Store, WalletCards } from 'lucide-react';
import { type SidebarData } from '../types';


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
          title: 'Penjualan',
          icon: ShoppingBasket,
          items: [
            {
              title: 'Tagihan',
              url: '/sales/invoices',
              icon: FileText,
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
import {
  ChartPie,
  ContactRound,
  CreditCardIcon,
  DollarSign,
  FileText,
  GalleryHorizontalEnd,
  LayoutDashboard,
  Settings,
  ShoppingBasket,
  ShoppingCart,
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
          title: 'Penjualan',
          icon: ShoppingBasket,
          items: [
            {
              title: 'Overview',
              url: '/sales/overview',
              icon: ChartPie,
            },
            {
              title: 'Tagihan',
              url: '/sales/invoices',
              icon: FileText,
            },
          ],
        },
        {
          title: 'Pembelian',
          icon: ShoppingCart,
          items: [
            {
              title: 'Overview',
              url: '/purchases/overview',
              icon: ChartPie,
            },
            {
              title: 'Tagihan',
              url: '/purchases/invoices',
              icon: FileText,
            },
          ],
        },
        {
          title: 'Biaya',
          url: '/expenses',
          icon: CreditCardIcon,
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
          title: 'Kas & Bank',
          icon: DollarSign,
          url: '/cash-bank',
        },
        {
          title: 'Akun',
          icon: WalletCards,
          url: '/account',
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
      ],
    },
  ],
}

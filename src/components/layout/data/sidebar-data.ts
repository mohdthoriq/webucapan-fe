import {
  Bot,
  Briefcase,
  ChartLine,
  ChartPie,
  ContactRound,
  CreditCardIcon,
  Database,
  DollarSign,
  FileText,
  GalleryHorizontalEnd,
  Globe,
  LayoutDashboard,
  Settings,
  SettingsIcon,
  ShoppingBasket,
  ShoppingCart,
  Store,
  WalletCards,
  Workflow,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
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
      title: 'Transaksi',
      items: [
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
      ],
    },
    {
      title: 'Inventori',
      items: [
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
      ],
    },
    {
      title: 'Keuangan',
      items: [
        {
          title: 'Laporan',
          icon: ChartLine,
          url: '/reports',
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
      ],
    },
    {
      title: 'Relasi',
      items: [
        {
          title: 'Kontak',
          url: '/contacts',
          icon: ContactRound,
        },
      ],
    },
    {
      title: 'Pengaturan',
      items: [
        {
          title: 'Pengaturan',
          icon: Settings,
          items: [
            {
              title: 'Perusahaan',
              url: '/settings?tab=company',
              icon: Briefcase,
            },
            {
              title: 'Alur Bisnis',
              url: '/settings?tab=business_flow',
              icon: Workflow,
            },
            {
              title: 'Layout & Template',
              url: '/settings?tab=layout_template',
              icon: Bot,
            },
            {
              title: 'Akun & Pengguna',
              url: '/settings?tab=user_account',
              icon: SettingsIcon,
            },
            {
              title: 'Data Master',
              url: '/settings?tab=master_data',
              icon: Database,
            },
            {
              title: 'Integrasi',
              url: '/settings?tab=integration',
              icon: Globe,
            },
          ],
        },
      ],
    },
  ],
}

import {
  // Bot,
  Briefcase,
  Building2,
  Calendar,
  ChartLine,
  ChartPie,
  ContactRound,
  CreditCardIcon,
  Database,
  DollarSign,
  FileText,
  GalleryHorizontalEnd,
  // Globe,
  HandCoins,
  LayoutDashboard,
  ReceiptText,
  Ruler,
  // Settings,
  SettingsIcon,
  Shield,
  ShoppingBasket,
  ShoppingCart,
  Store,
  Tag,
  Users,
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
        // {
        //   title: 'Pengaturan',
        //   icon: Settings,
        //   items: [
        //     {
        //       title: 'Perusahaan',
        //       url: '/settings?tab=company',
        //       icon: Briefcase,
        //     },
        //     {
        //       title: 'Alur Bisnis',
        //       url: '/settings?tab=business_flow',
        //       icon: Workflow,
        //     },
        //     {
        //       title: 'Layout & Template',
        //       url: '/settings?tab=layout_template',
        //       icon: Bot,
        //     },
        //     {
        //       title: 'Akun & Pengguna',
        //       url: '/settings?tab=user_account',
        //       icon: SettingsIcon,
        //     },
        //     {
        //       title: 'Data Master',
        //       url: '/settings?tab=master_data',
        //       icon: Database,
        //     },
        //     {
        //       title: 'Integrasi',
        //       url: '/settings?tab=integration',
        //       icon: Globe,
        //     },
        //   ],
        // },
        {
          title: 'Perusahaan',
          icon: Briefcase,
          items: [
            {
              title: 'Profil Perusahaan',
              url: '/settings/company',
              icon: Building2,
            },
            {
              title: 'Billing',
              url: '/settings/subscription',
              icon: ReceiptText,
            },
          ],
        },
        {
          title: 'Alur Bisnis',
          icon: Workflow,
          items: [
            {
              title: 'Penomoran Otomatis',
              url: '/settings/auto-sequencing',
              icon: FileText,
            },
          ],
        },
        {
          title: 'Akun & Pengguna',
          icon: SettingsIcon,
          items: [
            {
              title: 'Pengguna',
              icon: Users,
              url: '/settings/users',
            },
            {
              title: 'Peran',
              url: '/settings/company-roles',
              icon: Shield,
            },
            {
              title: 'Profil',
              url: '/settings/profile',
              icon: SettingsIcon,
            },
          ],
        },
        {
          title: 'Data Master',
          icon: Database,
          items: [
            {
              title: 'Satuan',
              url: '/settings/units',
              icon: Ruler,
            },
            {
              title: 'Pajak',
              url: '/settings/taxes',
              icon: HandCoins,
            },
            {
              title: 'Termin',
              url: '/settings/payment-terms',
              icon: Calendar,
            },
            {
              title: 'Tags',
              url: '/settings/tags',
              icon: Tag,
            },
          ],
        },
      ],
    },
  ],
}

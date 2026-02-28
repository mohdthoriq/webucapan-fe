import {
  ChartLine,
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
import { PERMISSION_KEY } from '@/constants/permissions'
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
          permission: PERMISSION_KEY.DASHBOARD_VIEW,
        },
      ],
    },
    {
      title: 'Transaksi',
      items: [
        {
          title: 'Penjualan',
          icon: ShoppingBasket,
          permission: PERMISSION_KEY.SALES,
          items: [
            {
              title: 'Overview',
              url: '/sales/overview',
              icon: ChartPie,
              permission: PERMISSION_KEY.SALES_OVERVIEW_VIEW,
            },
            {
              title: 'Tagihan',
              url: '/sales/invoices',
              icon: FileText,
              permission: PERMISSION_KEY.SALES_INVOICE_VIEW,
            },
          ],
        },
        {
          title: 'Pembelian',
          icon: ShoppingCart,
          permission: PERMISSION_KEY.PURCHASE,
          items: [
            {
              title: 'Overview',
              url: '/purchases/overview',
              icon: ChartPie,
              permission: PERMISSION_KEY.PURCHASE_OVERVIEW_VIEW,
            },
            {
              title: 'Tagihan',
              url: '/purchases/invoices',
              icon: FileText,
              permission: PERMISSION_KEY.PURCHASE_INVOICE_VIEW,
            },
          ],
        },
        {
          title: 'Biaya',
          url: '/expenses',
          icon: CreditCardIcon,
          permission: PERMISSION_KEY.EXPENSE_VIEW,
        },
      ],
    },
    {
      title: 'Inventori',
      items: [
        {
          title: 'Produk',
          icon: Store,
          permission: PERMISSION_KEY.PRODUCT,
          items: [
            {
              title: 'Kategori',
              url: '/product-categories',
              icon: GalleryHorizontalEnd,
              permission: PERMISSION_KEY.PRODUCT_CATEGORY_VIEW,
            },
            {
              title: 'Produk',
              url: '/products',
              icon: Store,
              permission: PERMISSION_KEY.PRODUCT_VIEW,
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
          permission: PERMISSION_KEY.REPORTS,
        },
        {
          title: 'Kas & Bank',
          icon: DollarSign,
          url: '/cash-bank',
          permission: PERMISSION_KEY.CASH_BANK_VIEW,
        },
        {
          title: 'Akun',
          icon: WalletCards,
          url: '/account',
          permission: PERMISSION_KEY.ACCOUNT_VIEW,
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
          permission: PERMISSION_KEY.CONTACT_VIEW,
        },
      ],
    },
    {
      title: 'Sistem',
      items: [
        {
          title: 'Pengaturan',
          url: '/settings',
          icon: Settings,
          permission: PERMISSION_KEY.SETTINGS,
        },
        // {
        //   title: 'Perusahaan',
        //   icon: Briefcase,
        //   items: [
        //     {
        //       title: 'Profil Perusahaan',
        //       url: '/settings/company',
        //       icon: Building2,
        //     },
        //     {
        //       title: 'Billing',
        //       url: '/settings/subscription',
        //       icon: ReceiptText,
        //     },
        //   ],
        // },
        // {
        //   title: 'Alur Bisnis',
        //   icon: Workflow,
        //   items: [
        //     {
        //       title: 'Penomoran Otomatis',
        //       url: '/settings/auto-sequencing',
        //       icon: FileText,
        //     },
        //   ],
        // },
        // {
        //   title: 'Akun & Pengguna',
        //   icon: SettingsIcon,
        //   items: [
        //     {
        //       title: 'Pengguna',
        //       icon: Users,
        //       url: '/settings/users',
        //     },
        //     {
        //       title: 'Peran',
        //       url: '/settings/company-roles',
        //       icon: Shield,
        //     },
        //     {
        //       title: 'Profil',
        //       url: '/settings/profile',
        //       icon: SettingsIcon,
        //     },
        //   ],
        // },
        // {
        //   title: 'Data Master',
        //   icon: Database,
        //   items: [
        //     {
        //       title: 'Satuan',
        //       url: '/settings/units',
        //       icon: Ruler,
        //     },
        //     {
        //       title: 'Pajak',
        //       url: '/settings/taxes',
        //       icon: HandCoins,
        //     },
        //     {
        //       title: 'Termin',
        //       url: '/settings/payment-terms',
        //       icon: Calendar,
        //     },
        //     {
        //       title: 'Tags',
        //       url: '/settings/tags',
        //       icon: Tag,
        //     },
        //   ],
        // },
      ],
    },
  ],
}

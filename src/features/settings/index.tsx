import {
  Activity,
  Bot,
  Briefcase,
  Calendar,
  Database,
  FileText,
  Globe,
  LayoutTemplate,
  Settings as SettingsIcon,
  Users,
  Workflow,
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const tabs = [
  {
    name: 'Perusahaan',
    value: 'company',
    icon: Briefcase,
    items: [
      {
        title: 'Profil Perusahaan',
        description: 'Atur detail perusahaan Anda',
        icon: Briefcase,
      },
      {
        title: 'Pengguna',
        description: 'Kelola pengguna dan hak akses',
        icon: Users,
      },
    ],
  },
  {
    name: 'Alur Bisnis',
    value: 'business_flow',
    icon: Workflow,
    items: [
      {
        title: 'Alur Bisnis',
        description: 'Atur alur bisnismu',
        icon: Workflow,
      },
      {
        title: 'Penomoran Otomatis',
        description: 'Atur penomoran otomatis invoice',
        icon: FileText,
      },
      {
        title: 'Tanggal Penguncian',
        description: 'Kunci data lama untuk tutup buku',
        icon: Calendar,
      },
      {
        title: 'Pemetaan Akun',
        description: 'Pemetaan akun CoA untuk transaksi di Kledo',
        icon: Database,
      },
      {
        title: 'Audit',
        description: 'Pantau log perubahan data',
        icon: Activity,
      },
      {
        title: 'Konsolidasi',
        description: 'Atur perusahaan dan akun untuk laporan konsolidasi',
        icon: Briefcase,
      },
      {
        title: 'Custom Fields',
        description: 'Custom data pada invoicemu',
        icon: LayoutTemplate,
      },
      {
        title: 'Multi Mata Uang',
        description: 'Atur penggunaan banyak mata uang',
        icon: Globe,
      },
    ],
  },
  {
    name: 'Layout & Template',
    value: 'layout_template',
    icon: Bot,
    items: [
      {
        title: 'Template Invoice',
        description: 'Atur tampilan invoice Anda',
        icon: FileText,
      },
      {
        title: 'Email Template',
        description: 'Atur template email otomatis',
        icon: Bot,
      },
    ],
  },
  {
    name: 'Akun & Pengguna',
    value: 'user_account',
    icon: SettingsIcon,
    items: [
      {
        title: 'Keamanan',
        description: 'Atur keamanan akun Anda',
        icon: SettingsIcon,
      },
      {
        title: 'Notifikasi',
        description: 'Atur preferensi notifikasi',
        icon: Bot,
      },
    ],
  },
  {
    name: 'Data Master',
    value: 'master_data',
    icon: Database,
    items: [
      {
        title: 'Produk & Jasa',
        description: 'Kelola data produk dan jasa',
        icon: Briefcase,
      },
      {
        title: 'Kontak',
        description: 'Kelola data pelanggan dan vendor',
        icon: Users,
      },
    ],
  },
  {
    name: 'Integrasi',
    value: 'integration',
    icon: Globe,
    items: [
      {
        title: 'API Keys',
        description: 'Kelola API keys untuk integrasi',
        icon: Globe,
      },
      {
        title: 'Webhooks',
        description: 'Atur webhooks untuk event real-time',
        icon: Activity,
      },
    ],
  },
]

function Settings() {
  return (
    <div className='flex-1 space-y-3'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Pengaturan</h1>
        <p className='text-muted-foreground mt-2'>
          Kelola profil pengguna dan pengaturan perusahaan Anda
        </p>
      </div>

      <hr />

      <Tabs
        orientation='vertical'
        defaultValue={tabs[1].value}
        className='mt-8 flex w-full flex-row items-start justify-center gap-6'
      >
        <TabsList className='grid w-64 shrink-0 grid-cols-1 gap-1 bg-transparent p-0'>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className='data-[state=active]:bg-primary/10 data-[state=active]:text-primary hover:bg-muted h-auto justify-start px-4 py-2 text-base font-medium transition-all'
            >
              <tab.icon className='me-3 h-5 w-5' /> {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className='bg-card text-card-foreground w-full flex-1 rounded-xl border shadow-sm'>
          {tabs.map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className='m-0 space-y-6 p-6'
            >
              <div className='mb-6 flex items-center gap-2'>
                <tab.icon className='text-muted-foreground h-6 w-6' />
                <h2 className='text-xl font-semibold tracking-tight'>
                  {tab.name}
                </h2>
              </div>

              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {tab.items.map((item) => (
                  <div
                    key={item.title}
                    className='group bg-background hover:border-primary/50 flex cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border p-6 text-center shadow-sm transition-all hover:shadow-md'
                  >
                    <div className='bg-primary/10 text-primary rounded-full p-3 transition-transform group-hover:scale-110'>
                      <item.icon className='h-8 w-8' />
                    </div>
                    <div className='space-y-1'>
                      <h3 className='leading-none font-semibold tracking-tight'>
                        {item.title}
                      </h3>
                      <p className='text-muted-foreground text-sm'>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  )
}

export { Settings }

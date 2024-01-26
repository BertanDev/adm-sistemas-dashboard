import { Menu } from '@/components/Home/Menu'
import { Sidebar } from '@/components/Home/Sidebar'

// export const metadata: Metadata = {
//   title: {
//     template: 'ADM Analytics | %s',
//     default: 'ADM Analytics',
//   },
// }

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col lg:flex-row">
      {/* Sidebar para telas grandes */}
      <div className="hidden lg:block w-64">
        <Sidebar  />
      </div>

      {/* Menu para telas pequenas */}
      <div className="lg:hidden">
        <Menu  />
      </div>

      {/* Conteúdo principal (children) */}
      <div className="flex-1">{children}</div>
    </section>
  )
}
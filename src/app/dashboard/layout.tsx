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
    <section className="flex">
      <Sidebar />
      {children}
    </section>
  )
}

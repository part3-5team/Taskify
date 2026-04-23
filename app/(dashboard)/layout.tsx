import SideMenu from '@/components/dashboard/SideMenu'
import Header from '@/components/dashboard/Header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideMenu />
      <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
        <Header />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

import SideMenu from '@/components/dashboard/SideMenu'
import Header from '@/components/dashboard/Header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <SideMenu />
      <main className="flex-1">
        <Header />
        {children}
      </main>
    </div>
  )
}

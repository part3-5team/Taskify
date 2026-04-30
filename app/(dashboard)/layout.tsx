import SideMenu from '@/components/dashboard/SideMenu'
import Header from '@/components/dashboard/Header'
import DashboardMobileDimm from '@/components/dashboard/DashboardMobileDimm'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideMenu />
      <DashboardMobileDimm />
      <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
        <Header />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

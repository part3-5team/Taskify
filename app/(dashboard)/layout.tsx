import SideMenu from '@/components/dashboard/SideMenu'
import Header from '@/components/dashboard/Header'
import DashboardMobileDimm from '@/components/dashboard/DashboardMobileDimm'
import { SidebarProvider } from '@/libs/contexts/SideBarContext'
import MobileSidebarWrapper from '@/components/dashboard/SideMenuWrapper'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <MobileSidebarWrapper>
          <SideMenu />
        </MobileSidebarWrapper>
        <DashboardMobileDimm />
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          <Header />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

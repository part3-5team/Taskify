import SideMenu from '@/components/dashboard/SideMenu'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <SideMenu />
      <main className="flex-1">{children}</main>
    </div>
  )
}


import SidebarHeader from '@/components/dashboard/SidebarHeader'
import SidebarDashboardList from '@/components/dashboard/SidebarDashboardList'
import SidebarFooter from '@/components/dashboard/SidebarFooter'

export default function SideMenu() {
  return (
    <aside className="bg-black-500 flex h-full shrink-0 w-[300px] flex-col border-r border-gray-900 py-2">
      <SidebarHeader />
      <SidebarDashboardList />
      <div className="mt-auto">
        <SidebarFooter />
      </div>
    </aside>
  )
}

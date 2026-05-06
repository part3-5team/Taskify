import SidebarHeader from '@/components/dashboard/SidebarHeader'
import SidebarDashboardList from '@/components/dashboard/SidebarDashboardList'
import SidebarFooter from '@/components/dashboard/SidebarFooter'
import { getDashboards } from '@/libs/api/dashboard/getDashboard'

export default async function SideMenu() {
  // 서버에서 대시보드 목록 조회
  const result = await getDashboards({
    navigationMethod: 'pagination',
    page: 1,
    size: 18,
  })
  const dashboards = result.success && result.data ? result.data.dashboards : []

  return (
    <aside className="bg-black-500 absolute z-50 mx-auto box-border flex h-full shrink-0 flex-col border-r border-gray-900 py-2 md:static md:flex md:w-[220px] md:w-[clamp(200px,calc(50.78vw-190px),330px)]">
      <SidebarHeader />
      <SidebarDashboardList dashboards={dashboards} />
      <div className="mt-auto min-w-0">
        <SidebarFooter />
      </div>
    </aside>
  )
}

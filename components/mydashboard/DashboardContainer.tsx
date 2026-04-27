import EmptyMyDashboard from '@/components/mydashboard/EmptyMyDashboard'
import DashboardList from '@/components/mydashboard/DashboardLIst'
import { getDashboards } from '@/libs/api/dashboard'

export default async function DashboardContainer() {
  const result = await getDashboards({
    page: 1,
    size: 9,
  })

  const dashboards = result.success && result.data ? result.data.dashboards : []
  const hasDashboards = dashboards.length > 0
  return (
    <section className="flex flex-col gap-5 px-12 pb-12">
      <h2 className="text-xl-20-bold py-2">내 대시보드</h2>
      {hasDashboards ? (
        <DashboardList dashboards={dashboards} />
      ) : (
        <EmptyMyDashboard />
      )}
    </section>
  )
}

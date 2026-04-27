import EmptyMyDashboard from '@/components/mydashboard/EmptyMyDashboard'
import DashboardList from '@/components/mydashboard/DashboardLIst'
import { getDashboards } from '@/libs/api/dashboard'

export default function DashboardContainer() {
  const hasDashboards = getDashboards.length > 0
  return (
    <section className="flex flex-col gap-5 px-12 pb-12">
      <h2 className="text-xl-20-bold py-2">내 대시보드</h2>
      {hasDashboards ? (
        <DashboardList dashboards={getDashboards} />
      ) : (
        <EmptyMyDashboard />
      )}
    </section>
  )
}

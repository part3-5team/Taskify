import EmptyMyDashboard from '@/components/mydashboard/EmptyMyDashboard'
import DashboardList from '@/components/mydashboard/DashboardList'
import type { Dashboard } from '@/libs/types/Dashboard'

type DashboardContainerProps = {
  dashboards: Dashboard[]
  currentPage: number
  totalPages: number
}

export default function DashboardContainer({
  dashboards,
  currentPage,
  totalPages,
}: DashboardContainerProps) {
  const hasDashboards = dashboards.length > 0

  return (
    <section className="flex flex-col gap-5 px-12 pb-12">
      <h2 className="text-xl-20-bold py-2">내 대시보드</h2>
      {hasDashboards ? (
        <DashboardList
          dashboards={dashboards}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      ) : (
        <EmptyMyDashboard />
      )}
    </section>
  )
}

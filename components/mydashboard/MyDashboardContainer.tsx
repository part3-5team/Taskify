import EmptyMyDashboard from '@/components/mydashboard/EmptyMyDashboard'
import MyDashboardList from '@/components/mydashboard/MyDashboardLIst'
import type { Dashboard } from '@/libs/types/Dashboard'

const mockDashboards: Dashboard[] = [
  {
    id: 1,
    title: '프로젝트 관리',
    color: 'green',
    createdByMe: true,
  },
  {
    id: 2,
    title: '디자인 시스템',
    color: 'blue',
    createdByMe: false,
  },
  {
    id: 3,
    title: 'Taskify 만들기',
    color: 'purple',
    createdByMe: false,
  },
  {
    id: 4,
    title: '프로젝트 관리',
    color: 'red',
    createdByMe: true,
  },
  {
    id: 5,
    title: '디자인 시스템',
    color: 'yellow',
    createdByMe: false,
  },
  {
    id: 6,
    title: 'Taskify 만들기',
    color: 'green',
    createdByMe: false,
  },
]

export default function MyDashboardContainer() {
  const hasDashboards = mockDashboards.length > 0
  return (
    <section className="flex flex-col gap-5 px-12 pb-12">
      <h2 className="text-xl-20-bold py-2">내 대시보드</h2>
      {hasDashboards ? (
        <MyDashboardList dashboards={mockDashboards} />
      ) : (
        <EmptyMyDashboard />
      )}
    </section>
  )
}

import EmptyMyDashboard from '@/components/mydashboard/EmptyMyDashboard'
import MyDashboardList from '@/components/mydashboard/MyDashboardLIst'

export default function MyDashboardContainer() {
  return (
    <section className="flex flex-col gap-5 px-12 pb-12">
      <h2 className="text-xl-20-bold py-2">내 대시보드</h2>
      {/* <EmptyMyDashboard /> */}
      <MyDashboardList />
    </section>
  )
}

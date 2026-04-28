import DashboardClient from '@/components/dashboard/DashboardClient'
import { getDashboardById } from '@/libs/api/dashboard/getDashboard'

interface DashboardPageProps {
  params: Promise<{ id: string }>
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { id } = await params
  const dashboardId = Number(id)

  // 서버에서 대시보드 정보 조회
  const result = await getDashboardById(dashboardId)

  // API 실패 시에도 ui 안깨지도록
  const dashboardTitle =
    result.success && result.data ? result.data.title : '대시보드'

  return (
    <DashboardClient
      dashboardId={dashboardId}
      dashboardTitle={dashboardTitle}
    />
  )
}

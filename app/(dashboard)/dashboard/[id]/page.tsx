import DashboardClient from '@/components/dashboard/DashboardClient'
import { getDashboardById } from '@/libs/api/dashboard/getDashboard'
import { getDashboardMembers } from '@/libs/api/dashboard/getDashboardMembers'
import { getColumns } from '@/libs/api/dashboard/getColumns'
import { Member, Column } from '@/libs/types/Dashboard'

interface DashboardPageProps {
  params: Promise<{ id: string }>
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { id } = await params
  const dashboardId = Number(id)

  // 서버에서 대시보드 정보 조회
  const result = await getDashboardById(dashboardId)
  const dashboardTitle =
    result.success && result.data ? result.data.title : '대시보드'

  // 서버에서 멤버 목록 조회
  const membersResult = await getDashboardMembers({ dashboardId, size: 50 })
  const members: Member[] =
    membersResult.success && membersResult.data
      ? membersResult.data.members
      : []

  // 서버에서 컬럼 목록 조회
  const columnsResult = await getColumns(dashboardId)
  const initialColumns: Column[] =
    columnsResult.success && columnsResult.data ? columnsResult.data.data : []

  return (
    <DashboardClient
      dashboardId={dashboardId}
      dashboardTitle={dashboardTitle}
      members={members}
      initialServerColumns={initialColumns}
    />
  )
}

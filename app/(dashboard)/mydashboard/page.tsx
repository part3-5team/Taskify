export const dynamic = 'force-dynamic'

import InvitationContainer from '@/components/mydashboard/InvitationContainer'
import DashboardContainer from '@/components/mydashboard/DashboardContainer'
import { getInvitations } from '@/libs/api/dashboard/getInvitations'
import { getDashboards } from '@/libs/api/dashboard/getDashboard'

export default async function MyDashboardPage() {
  const [dashboardData, inviteData] = await Promise.all([
    getDashboards({
      page: 1,
      size: 9,
    }),
    getInvitations({
      page: 1,
      size: 9,
    }),
  ])
  const dashboards = dashboardData.data?.dashboards ?? []
  const invitations = inviteData.data?.invitations ?? []

  return (
    <div className="bg-bg min-h-screen w-full text-gray-100">
      <h1 className="text-3xl-32-bold w-full px-12 pt-6 pb-4 leading-19">홈</h1>
      <DashboardContainer dashboards={dashboards} />
      <InvitationContainer invitations={invitations} />
    </div>
  )
}

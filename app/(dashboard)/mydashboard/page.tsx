import InvitationContainer from '@/components/mydashboard/InvitationContainer'
import DashboardContainer from '@/components/mydashboard/DashboardContainer'

export default function MyDashboardPage() {
  return (
    <div className="bg-bg min-h-screen w-full text-gray-100">
      <h1 className="text-3xl-32-bold w-full px-12 pt-6 pb-4 leading-19">홈</h1>
      <DashboardContainer />
      <InvitationContainer />
    </div>
  )
}

import DashboardInvitationList from './DashboardInvitationList'
import EmptyInvite from './EmptyInvitation'

export default function DashboardInvitationContainer() {
  return (
    <div className="flex flex-col gap-5 px-12 pb-12">
      <h2 className="text-xl-20-bold py-2">초대받은 대시보드</h2>
      <EmptyInvite />
      <DashboardInvitationList />
    </div>
  )
}

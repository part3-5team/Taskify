import { getInvitations } from '@/libs/api/dashboard'

interface InvitationListProps {
  dashboardId: number
}

export default function InvitationList({ dashboardId, }: InvitationListProps) {
  return (
    <div>
      <div className="border-black-200 text-2lg-18-bold flex items-center justify-center gap-2.5 border-b px-7.5 py-3.5">
        <p className="flex-6 justify-center text-gray-400">이름</p>
        <p className="flex-2 justify-center text-gray-400">초대자</p>
        <p className="flex-2 justify-center text-gray-400">수락 여부</p>
      </div>
      {/*초대받은 대시보드 목록*/}
      {invitations.map((invitation) => (
        <div
          key={invitation.id}
          className="border-black-200 hover:bg-black-300 flex items-center border-b px-7.5 py-3.5 text-gray-100"
        >
          <p className="flex-6">{invitation.invitee.nickname}</p>
          <p className="flex-2">{invitation.inviter.nickname}</p>
          <div className="text-lg-16-semibold flex flex-2 gap-2 text-white">
            <button className="hover:bg-black-200 cursor-pointer rounded-full bg-gray-900 px-3.5 py-1.5">
              거절
            </button>
            <button className="bg-brand-500 hover:bg-brand-600 cursor-pointer rounded-full px-3.5 py-1.5">
              수락
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

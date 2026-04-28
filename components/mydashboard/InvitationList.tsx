import { Invitation } from '@/libs/types/Dashboard'
interface InvitationListProps {
  invitations: Invitation[]
}

export default function InvitationList({ invitations }: InvitationListProps) {
  return (
    <div>
      <div className="border-black-200 text-2lg-18-bold flex items-center justify-center gap-2.5 border-b px-7.5 py-3.5">
        <p className="flex-6 justify-center text-gray-400">이름</p>
        <p className="flex-2 justify-center text-gray-400">초대자</p>
        <p className="flex-2 justify-center text-gray-400">수락 여부</p>
      </div>
      {invitations.map((invitation) => {
        const inviter = invitation.inviter
        const avatar = inviter.nickname?.trim().slice(0, 1) || '?'

        return (
          <div
            key={invitation.id}
            className="border-black-200 hover:bg-black-300 flex items-center border-b px-7.5 py-3.5 text-gray-100"
          >
            <p className="flex-6">{invitation.dashboard.title}</p>
            <div className="flex flex-2 items-center gap-2">
              {/* 사용자 컬러로 지정된 컬러로 나오게? */}
              <div className="bg-profile-blue text-md-14-medium flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white">
                {avatar}
              </div>

              <p>{inviter.nickname}</p>
            </div>
            <div className="text-lg-16-semibold flex flex-2 gap-2 text-white">
              {/*TODO : 거절-받은 초대 삭제, 수락-대시보드에 멤버 추가*/}
              <button className="hover:bg-black-200 cursor-pointer rounded-full bg-gray-900 px-3.5 py-1.5">
                거절
              </button>
              <button className="bg-brand-500 hover:bg-brand-600 cursor-pointer rounded-full px-3.5 py-1.5">
                수락
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

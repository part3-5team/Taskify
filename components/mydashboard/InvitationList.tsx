import { Invitation } from '@/libs/types/Dashboard'

interface InvitationListProps {
  invitations: Invitation[]
  onRespondInvitation: (invitationId: number, inviteAccepted: boolean) => void
}

export default function InvitationList({
  invitations,
  onRespondInvitation,
}: InvitationListProps) {
  console.log(invitations)
  return (
    <div>
      <div className="border-black-200 text-2lg-18-bold hidden items-center justify-center gap-4 border-b px-7.5 py-3.5 md:flex md:gap-2.5">
        <p className="flex-6 justify-center text-gray-400">이름</p>
        <p className="flex-2 justify-center text-gray-400">초대자</p>
        <p className="flex-2 justify-center text-gray-400">수락 여부</p>
      </div>
      {invitations.map((invitation) => {
        const inviter = invitation.inviter

        return (
          <div
            key={invitation.id}
            className="border-black-200 items-center border-b px-7.5 py-3.5 md:flex"
          >
            <p className="text-2lg-18-bold min-w-0 truncate md:flex-[3]">
              {invitation.dashboard.title}
            </p>
            <div className="flex w-full items-center justify-between gap-4 md:flex-[2]">
              <p className="min-w-0 truncate md:flex-1">{inviter.nickname}</p>
              <div className="text-lg-16-semibold flex shrink-0 gap-2 text-white">
                {/* 받은 초대 거절/수락 */}
                <button
                  type="button"
                  onClick={() => onRespondInvitation(invitation.id, false)}
                  className="hover:bg-black-200 text-lg-14-semibold md:text-lg-16-semibold h-7 w-12 cursor-pointer rounded-full bg-gray-900 md:h-8 md:w-14"
                >
                  거절
                </button>
                <button
                  type="button"
                  onClick={() => onRespondInvitation(invitation.id, true)}
                  className="bg-brand-500 hover:bg-brand-600 text-lg-14-semibold md:text-lg-16-semibold h-7 w-12 cursor-pointer rounded-full md:h-8 md:w-14"
                >
                  수락
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

import { Invitation } from '@/libs/types/Dashboard'
import Button from '@/components/common/button'

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
      {/* 반응형에서 보이지 않게 처리 */}
      <div className="border-black-200 text-2lg-18-bold hidden border-b px-7.5 py-3.5 text-gray-400 md:grid md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)_minmax(112px,1fr)] md:items-center md:gap-4">
        <p className="text-center">이름</p>
        <p className="text-center">초대자</p>
        <p className="text-center">수락 여부</p>
      </div>
      {invitations.map((invitation) => {
        const inviter = invitation.inviter

        return (
          <div
            key={invitation.id}
            className="border-black-200 border-b px-7.5 py-3.5 md:grid md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)_minmax(112px,1fr)] md:items-center md:gap-4"
          >
            <p className="text-2lg-18-bold min-w-0 truncate">
              {invitation.dashboard.title}
            </p>
            <div className="flex items-center justify-between gap-4 md:contents">
              <p className="mt-1 min-w-0 truncate text-gray-300 md:mt-0 md:text-center">
                {inviter.nickname}
              </p>
              <div className="text-lg-16-semibold flex shrink-0 justify-end gap-2 text-white md:justify-center">
                {/* 받은 초대 거절/수락 */}
                <Button
                  type="button"
                  variant="cancel"
                  size="sm"
                  onClick={() => onRespondInvitation(invitation.id, false)}
                  className="whitespace-nowrap"
                >
                  거절
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => onRespondInvitation(invitation.id, true)}
                  className="whitespace-nowrap"
                >
                  수락
                </Button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

import Button from '@/components/common/button'
import Pagination from './Pagination'
import BackIcon from '@/assets/icons/ic_X.svg'
import InviteIcon from '@/assets/icons/ic_user-plus.svg'
import { Invitation, Member } from '@/libs/types/Dashboard'

interface MemberManagementSectionProps {
  members: Member[]
  invitations: Invitation[]
  memberPage: number
  invitePage: number
  memberTotalPages: number
  inviteTotalPages: number
  onPrevMemberPage: () => void
  onNextMemberPage: () => void
  onPrevInvitePage: () => void
  onNextInvitePage: () => void
  onDeleteMember: (id: number) => void
  onCancelInvite: (id: number) => void
  onOpenInviteModal: () => void
  onBack: () => void
}

export default function MemberManagementSection({
  members,
  invitations,
  memberPage,
  invitePage,
  memberTotalPages,
  inviteTotalPages,
  onPrevMemberPage,
  onNextMemberPage,
  onPrevInvitePage,
  onNextInvitePage,
  onDeleteMember,
  onCancelInvite,
  onOpenInviteModal,
  onBack,
}: MemberManagementSectionProps) {
  return (
    <section className="w-full px-[20px] pt-[20px] sm:px-0 md:px-6 md:pt-[30px] lg:pl-[50px]">
      <div className="mb-8 flex items-start justify-between lg:min-w-[700px]">
        <h1 className="sm:text-xl-20-bold text-xl leading-[170%] font-bold text-white md:text-2xl">
          멤버 관리
        </h1>

        <div className="text-lg-14-semibold flex flex-col items-center gap-[6px] text-gray-300">
          <button
            type="button"
            onClick={onBack}
            className="text-xs text-gray-400 hover:text-white md:text-sm"
          >
            <div className="w-fit rounded-full border border-gray-300 p-1">
              <BackIcon className="size-6" />
            </div>
          </button>
          <span className="hidden md:block">돌아가기</span>
        </div>
      </div>

      <div className="space-y-10">
        <div>
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="lg:text-xl-20-bold md:text-2lg-18-bold sm:text-lg-16-bold text-white">
              구성원
            </h2>
            <Pagination
              currentPage={memberPage}
              totalPages={memberTotalPages}
              onPrev={onPrevMemberPage}
              onNext={onNextMemberPage}
            />
          </div>

          <div className="bg-modal overflow-hidden rounded-2xl">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between gap-3 border-b border-white/5 px-4 py-3 last:border-b-0"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className={`bg-brand-400 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white`}
                  >
                    {member.nickname[0]}
                  </div>
                  <span className="lg:text-2lg-18-medium md:text-2lg-18-medium sm:text-lg-16-medium truncate text-white">
                    {member.nickname}
                  </span>
                </div>

                <Button
                  size="sm"
                  variant="cancel"
                  onClick={() => onDeleteMember(member.id)}
                >
                  삭제
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-[10px] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 lg:max-w-[440px]">
              <h2 className="lg:text-xl-20-bold md:text-2lg-18-bold text-lg-14-semibold sm:text-lg-16-bold text-white">
                초대내역
              </h2>
              <Button
                size="sm"
                onClick={onOpenInviteModal}
                className="flex items-center gap-[2px]"
              >
                초대
                <InviteIcon className="size-3.5" />
              </Button>
            </div>

            <Pagination
              currentPage={invitePage}
              totalPages={inviteTotalPages}
              onPrev={onPrevInvitePage}
              onNext={onNextInvitePage}
            />
          </div>

          <div className="bg-modal overflow-hidden rounded-2xl">
            {invitations.map((invite) => (
              <div
                key={invite.id}
                className="las:border-b-0 flex items-center justify-between gap-3 border-b border-white/5 px-4 py-3"
              >
                <span className="md:text-2lg-18-medium sm:text-lg-16-medium truncate text-white">
                  {invite.invitee.email}
                </span>

                <Button
                  size="sm"
                  variant="cancel"
                  onClick={() => onCancelInvite(invite.id)}
                >
                  취소
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

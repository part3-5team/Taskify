'use client'

import { ElementType } from 'react'
import Link from 'next/link'
import Setting from '@/assets/icons/ic_setting.svg'
import UserPlus from '@/assets/icons/ic_user_plus.svg'
import Logout from '@/assets/icons/ic_logout.svg'
import InviteMemberModal from './edit/InviteMemberModal'
import useDashboardHeader from '@/libs/hooks/useDashboardHeader'

const BUTTON_STYLE =
  'hover:bg-modal active:bg-black-300 flex items-center gap-2 rounded-xs px-3 py-2.5 cursor-pointer text-gray-400 text-lg-16-medium transition-colors'

const HeaderActionButton = ({
  onClick,
  href,
  icon: Icon,
  label,
}: {
  onClick?: () => void
  href?: string
  icon: ElementType
  label: string
}) => {
  const content = (
    <>
      <Icon aria-label={`${label} 아이콘`} />
      {label}
    </>
  )

  if (href)
    return (
      <Link href={href} className={BUTTON_STYLE}>
        {content}
      </Link>
    )

  return (
    <button onClick={onClick} className={BUTTON_STYLE}>
      {content}
    </button>
  )
}

export default function Header() {
  const {
    isMyDashboard,
    dashboardId,
    inviteModalOpen,
    setInviteModalOpen,
    handleInvite,
    handleLogout,
  } = useDashboardHeader()

  return (
    <header className="bg-bg border-black-300 flex h-18 w-full items-center justify-end border-b-2 p-7.5">
      <nav className="flex gap-4">
        {isMyDashboard && (
          <HeaderActionButton
            onClick={handleLogout}
            icon={Logout}
            label="로그아웃"
          />
        )}

        {!isMyDashboard && (
          <>
            <HeaderActionButton
              href={`/dashboard/${dashboardId}/edit`}
              icon={Setting}
              label="설정"
            />
            <HeaderActionButton
              onClick={() => setInviteModalOpen(true)}
              icon={UserPlus}
              label="초대"
            />
          </>
        )}

        <InviteMemberModal
          open={inviteModalOpen}
          onClose={() => setInviteModalOpen(false)}
          onSubmit={handleInvite}
        />
      </nav>
    </header>
  )
}

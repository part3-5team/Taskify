'use client'

import { ElementType, useEffect, useState } from 'react'
import Link from 'next/link'
import Setting from '@/assets/icons/ic_setting.svg'
import UserPlus from '@/assets/icons/ic_user_plus.svg'
import Logout from '@/assets/icons/ic_logout.svg'
import InviteMemberModal from './edit/InviteMemberModal'
import useDashboardHeader from '@/libs/hooks/useDashboardHeader'
import DashboardHeaderMemberList from './DashboardHeaderMemberList'
import { getDashboardDetail } from '@/libs/api/dashboard/getDeashboardDetail'
import MobileSideMenuButton from '@/assets/icons/ic_sidemenu.svg'
import LogoutModal from '../common/modal/LogoutModal'

const BUTTON_STYLE =
  'hover:bg-modal active:bg-black-300 flex items-center gap-2 rounded-xs px-3 py-2.5 cursor-pointer text-gray-400 text-lg-16-medium transition-colors'

const HeaderActionButton = ({
  onClick,
  href,
  icon: Icon,
  label,
  isLogout,
}: {
  onClick?: () => void
  href?: string
  icon: ElementType
  label: string
  isLogout?: boolean
}) => {
  const content = (
    <>
      <Icon aria-label={`${label} 아이콘`} />
      <span className={`${!isLogout && `hidden md:block`}`}>{label}</span>
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

export const DashboardMobileButton = () => {
  const handleSideMenuClick = () => {
    const sidebars = document.querySelectorAll('.sidebar')

    sidebars.forEach((el) => {
      el.classList.toggle('hidden')
      el.classList.add('flex')
    })
  }

  return (
    <button onClick={handleSideMenuClick} className="text-gray-300 md:hidden">
      <MobileSideMenuButton className="h-5 w-5" />
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

  const [isCreatedMyDashboard, setIsCreatedMyDashboard] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  useEffect(() => {
    let ignore = false

    const sidebars = document.querySelectorAll('.sidebar')

    sidebars.forEach((el) => {
      el.classList.add('hidden')
    })

    const fetchDetail = async () => {
      const res = await getDashboardDetail(Number(dashboardId))

      if (ignore) return

      if (res.data) {
        setIsCreatedMyDashboard(res.data.createdByMe)
      }
    }

    fetchDetail()

    return () => {
      ignore = true
    }
  }, [dashboardId])

  return (
    <header className="bg-bg border-black-300 flex h-[50px] w-full items-center justify-between border-b-2 py-[10px] pr-5 pl-[10px] md:justify-end md:p-7.5">
      <DashboardMobileButton />
      <nav className="flex gap-4">
        {!isMyDashboard && (
          <DashboardHeaderMemberList dashboardId={Number(dashboardId)} />
        )}
        {isMyDashboard && (
          <HeaderActionButton
            onClick={() => setIsLogoutModalOpen(true)}
            icon={Logout}
            label="로그아웃"
            isLogout
          />
        )}

        {!isMyDashboard && isCreatedMyDashboard && (
          <>
            <HeaderActionButton
              href={`/dashboard/${dashboardId}/edit`}
              icon={Setting}
              label="관리"
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

        {isLogoutModalOpen && (
          <LogoutModal
            onClose={() => setIsLogoutModalOpen(false)}
            onLogout={handleLogout}
          />
        )}
      </nav>
    </header>
  )
}

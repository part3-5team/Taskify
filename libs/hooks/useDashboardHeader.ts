import { useParams, usePathname } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'
import { inviteDashboard } from '@/libs/api/dashboard/inviteDashboard'
import { logout } from '@/libs/api/auth'

interface UseDashboardHeaderResult {
  isMyDashboard: boolean
  dashboardId: string | string[] | undefined
  inviteModalOpen: boolean
  setInviteModalOpen: Dispatch<SetStateAction<boolean>>
  handleInvite: (email: string) => Promise<boolean>
  handleLogout: () => Promise<void>
}

export default function useDashboardHeader(): UseDashboardHeaderResult {
  const [inviteModalOpen, setInviteModalOpen] = useState(false)
  const pathname = usePathname()
  const { id: dashboardId } = useParams()

  const isMyDashboard = pathname === '/mydashboard'

  const handleInvite = async (email: string): Promise<boolean> => {
    try {
      const res = await inviteDashboard(Number(dashboardId), email)

      if (!res.success) {
        alert(res.error)
        return false
      }

      alert('초대를 성공적으로 보냈습니다.')
      return true
    } catch (error) {
      console.error(error)
      alert('알 수 없는 오류가 발생했습니다.')
      return false
    }
  }

  const handleLogout = async () => {
    if (!confirm('로그아웃 하시겠습니까?')) return
    await logout()
  }

  return {
    isMyDashboard,
    dashboardId,
    inviteModalOpen,
    setInviteModalOpen,
    handleInvite,
    handleLogout,
  }
}

'use client'

import { useEffect, useState } from 'react'
import DashboardSidebar from './DashboardSidebar'
import DashboardEditSection from './DashboardEditSection'
import MemberManagementSection from './MemberManagementSection'
import InviteMemberModal from './InviteMemberModal'
import { useRouter } from 'next/navigation'
import MenuIcon from '@/assets/icons/ic_sidemenu.svg'
import DeleteConfirmModal from '../deleteConfirmModal'
import { inviteDashboard } from '@/libs/api/dashboard/inviteDashboard'
import { getInvitations } from '@/libs/api/dashboard/sentInvitations'
import { cancelInvitation } from '@/libs/api/dashboard/cancelInvitations'
import { getMembers } from '@/libs/api/dashboard/getMembers'
import { deleteMember } from '@/libs/api/dashboard/deleteMember'
import { deleteDashboard } from '@/libs/api/dashboard/deleteDashboard'
import { Invitation, Member } from '@/libs/types/Dashboard'
import { updateDashboard } from '@/libs/api/dashboard/updateDashboard'
import { getDashboardDetail } from '@/libs/api/dashboard/getDeashboardDetail'

interface DashboardEditClientProps {
  dashboardId: string
}

const MEMBER_PAGE_SIZE = 5
const INVITE_PAGE_SIZE = 5

export default function DashboardEditClient({
  dashboardId,
}: DashboardEditClientProps) {
  const router = useRouter()

  const [selectedTab, setSelectedTab] = useState<'edit' | 'members'>('edit')
  const [dashboardTitle, setDashboardTitle] = useState('')
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  const [members, setMembers] = useState<Member[]>([])
  const [memberTotalCount, setMemberTotalCount] = useState(0)
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [inviteTotalCount, setInviteTotalCount] = useState(0)

  const [memberPage, setMemberPage] = useState(1)
  const [invitePage, setInvitePage] = useState(1)
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const memberTotalPages = Math.max(
    1,
    Math.ceil(memberTotalCount / MEMBER_PAGE_SIZE),
  )

  const inviteTotalPages = Math.max(
    1,
    Math.ceil(inviteTotalCount / INVITE_PAGE_SIZE),
  )

  useEffect(() => {
    const fetchDashboardDetail = async () => {
      const result = await getDashboardDetail(Number(dashboardId))

      if (!result.success || !result.data) {
        alert(result.error ?? '대시보드 정보를 가져오지 못했습니다')
        return
      }

      setDashboardTitle(result.data.title)
      setSelectedColor(result.data.color)
    }

    fetchDashboardDetail()
  }, [dashboardId])

  useEffect(() => {
    const fetchMembers = async () => {
      const result = await getMembers({
        dashboardId: Number(dashboardId),
        page: memberPage,
        size: MEMBER_PAGE_SIZE,
      })

      if (!result.success || !result.data) {
        alert(result.error ?? '구성원 목록을 불러오지 못했습니다')
        return
      }

      setMembers(result.data.members)
      setMemberTotalCount(result.data.totalCount)
    }

    fetchMembers()
  }, [dashboardId, memberPage])

  useEffect(() => {
    const fetchInvitations = async () => {
      const result = await getInvitations({
        dashboardId: Number(dashboardId),
        page: invitePage,
        size: INVITE_PAGE_SIZE,
      })

      if (!result.success || !result.data) {
        alert(result.error ?? '초대 목록을 불러오지 못했습니다.')
        return
      }

      setInvitations(result.data.invitations)
      setInviteTotalCount(result.data.totalCount)
    }

    fetchInvitations()
  }, [dashboardId, invitePage])

  const handleUpdateDashboard = async () => {
    if (!selectedColor) {
      alert('대시보드 색상을 선택해주세요')
      return
    }

    const formData = new FormData()
    formData.append('title', dashboardTitle)
    formData.append('color', selectedColor)

    const result = await updateDashboard(Number(dashboardId), formData)

    if (!result.success) {
      alert(result.error ?? '대시보드 수정에 실패했습니다.')
      return
    }

    alert('대시보드가 성공적으로 수정되었습니다.')
  }

  const handleDeleteDashboard = () => {
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDeleteDashboard = async () => {
    const result = await deleteDashboard({
      dashboardId: Number(dashboardId),
    })

    if (!result.success) {
      alert(result.error ?? '대시보드 삭제에 실패했습니다')
      return
    }

    setIsDeleteModalOpen(false)
    router.push('/mydashboard')
  }

  const handleDeleteMember = async (memberId: number) => {
    const result = await deleteMember({ memberId })

    if (!result.success) {
      alert(result.error ?? '구성원 삭제에 실패했습니다')
      return
    }

    const nextTotalCount = Math.max(0, memberTotalCount - 1)
    const nextTotalPages = Math.max(
      1,
      Math.ceil(nextTotalCount / MEMBER_PAGE_SIZE),
    )

    setMemberTotalCount(nextTotalCount)

    if (memberPage > nextTotalPages) {
      setMemberPage(nextTotalPages)
      return
    }

    const membersResult = await getMembers({
      dashboardId: Number(dashboardId),
      page: memberPage,
      size: MEMBER_PAGE_SIZE,
    })

    if (!membersResult.success || !membersResult.data) {
      alert(membersResult.error ?? '구성원 목록을 불러오지 못했습니다')
      return
    }

    setMembers(membersResult.data.members)
    setMemberTotalCount(membersResult.data.totalCount)
  }

  const handleCancelInvite = async (inviteId: number) => {
    const result = await cancelInvitation({
      dashboardId: Number(dashboardId),
      invitationId: inviteId,
    })

    if (!result.success) {
      alert(result.error ?? '초대 취소에 실패했습니다')
      return
    }

    const nextTotalCount = Math.max(0, inviteTotalCount - 1)
    const nextTotalPages = Math.max(
      1,
      Math.ceil(nextTotalCount / INVITE_PAGE_SIZE),
    )

    setInviteTotalCount(nextTotalCount)

    if (invitePage > nextTotalPages) {
      setInvitePage(nextTotalPages)
      return
    }

    const invitationsResult = await getInvitations({
      dashboardId: Number(dashboardId),
      page: invitePage,
      size: INVITE_PAGE_SIZE,
    })

    if (!invitationsResult.success || !invitationsResult.data) {
      alert(invitationsResult.error ?? '초대 목록을 불러오지 못했습니다')
      return
    }

    setInvitations(invitationsResult.data.invitations)
    setInviteTotalCount(invitationsResult.data.totalCount)
  }

  const handleAddInvite = async (email: string): Promise<boolean> => {
    const result = await inviteDashboard(Number(dashboardId), email)

    if (!result.success || result.data === null) {
      alert(result.error ?? '초대 보내기에 실패했습니다')
      return false
    }

    if (invitePage !== 1) {
      setInvitePage(1)
      return true
    }

    const invitationsResult = await getInvitations({
      dashboardId: Number(dashboardId),
      page: 1,
      size: INVITE_PAGE_SIZE,
    })

    if (!invitationsResult.success || !invitationsResult.data) {
      alert(invitationsResult.error ?? '초대 목록을 불러오지 못했습니다')
      return true
    }

    setInvitations(invitationsResult.data.invitations)
    setInviteTotalCount(invitationsResult.data.totalCount)

    return true
  }

  const handleBack = () => {
    router.push(`/dashboard/${dashboardId}`)
  }

  const handleChangeTab = (tab: 'edit' | 'members') => {
    setSelectedTab(tab)
    setIsMobileSidebarOpen(false)
  }

  if (!selectedColor) return null

  return (
    <>
      <div className="bg-modal min-h-screen text-white">
        <div className="flex min-h-screen w-full flex-col md:flex-row lg:min-w-[1280px]">
          <div className="hidden md:block">
            <DashboardSidebar
              selectedTab={selectedTab}
              onChangeTab={setSelectedTab}
              onDeleteDashboard={handleDeleteDashboard}
            />
          </div>

          <div
            className={`fixed top-0 left-0 z-50 h-screen w-[70vw] max-w-[320px] transition-transform duration-300 md:hidden ${
              isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <DashboardSidebar
              selectedTab={selectedTab}
              onChangeTab={handleChangeTab}
              onDeleteDashboard={handleDeleteDashboard}
            />
          </div>

          {isMobileSidebarOpen && (
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed top-0 right-0 z-40 h-screen w-[100vw] bg-black/70 md:hidden"
            />
          )}

          <main className="bg-modal min-h-screen w-full flex-1">
            <header className="flex h-[50px] w-full items-center justify-between border-b border-white/5 pr-5 pl-[10px] md:h-15 md:px-6 lg:h-18 lg:px-[30px]">
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(true)}
                className="flex items-center justify-center"
                aria-label="사이드바 열기"
              >
                <MenuIcon className="size-5 md:hidden" />
              </button>
            </header>

            {selectedTab === 'edit' ? (
              <DashboardEditSection
                title={dashboardTitle}
                selectedColor={selectedColor}
                onChangeTitle={setDashboardTitle}
                onChangeColor={setSelectedColor}
                onSubmit={handleUpdateDashboard}
                onBack={handleBack}
              />
            ) : (
              <MemberManagementSection
                members={members}
                invitations={invitations}
                memberPage={memberPage}
                invitePage={invitePage}
                memberTotalPages={memberTotalPages}
                inviteTotalPages={inviteTotalPages}
                onPrevMemberPage={() =>
                  setMemberPage((prev) => Math.max(1, prev - 1))
                }
                onNextMemberPage={() =>
                  setMemberPage((prev) => Math.min(memberTotalPages, prev + 1))
                }
                onPrevInvitePage={() =>
                  setInvitePage((prev) => Math.max(1, prev - 1))
                }
                onNextInvitePage={() =>
                  setInvitePage((prev) => Math.min(inviteTotalPages, prev + 1))
                }
                onDeleteMember={handleDeleteMember}
                onCancelInvite={handleCancelInvite}
                onOpenInviteModal={() => setIsInviteModalOpen(true)}
                onBack={handleBack}
              />
            )}
          </main>
        </div>
      </div>

      <InviteMemberModal
        open={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onSubmit={handleAddInvite}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        variant="dashboard"
        onCancel={() => setIsDeleteModalOpen(false)}
        onDelete={handleConfirmDeleteDashboard}
      />
    </>
  )
}

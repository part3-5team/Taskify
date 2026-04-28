'use client'

import {
  DashboardColor,
  initialInvitations,
  initialMembers,
  Invitation,
  Member,
} from './mock'
import { useMemo, useState } from 'react'
import DashboardSidebar from './DashboardSidebar'
import DashboardEditSection from './DashboardEditSection'
import MemberManagementSection from './MemberManagementSection'
import InviteMemberModal from './InviteMemberModal'
import { useRouter } from 'next/navigation'
import Menu from '@/assets/icons/ic_sidemenu.svg'
import DeleteConfirmModal from '../deleteConfirmModal'
import { updateDashboard } from '@/libs/api/dashboard/updateDashboard'

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
  const [dashboardTitle, setDashboardTitle] = useState('계란말이 만들기')
  const [selectedColor, setSelectedColor] = useState<DashboardColor>('red')

  const [members, setMembers] = useState<Member[]>(initialMembers)
  const [invitations, setInvitations] =
    useState<Invitation[]>(initialInvitations)

  const [memberPage, setMemberPage] = useState(1)
  const [invitePage, setInvitePage] = useState(1)
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const memberTotalPages = Math.max(
    1,
    Math.ceil(members.length / MEMBER_PAGE_SIZE),
  )
  const inviteTotalPages = Math.max(
    1,
    Math.ceil(invitations.length / INVITE_PAGE_SIZE),
  )

  const pagedMembers = useMemo(() => {
    const start = (memberPage - 1) * MEMBER_PAGE_SIZE
    return members.slice(start, start + MEMBER_PAGE_SIZE)
  }, [members, memberPage])

  const pagedInvitations = useMemo(() => {
    const start = (invitePage - 1) * INVITE_PAGE_SIZE
    return invitations.slice(start, start + INVITE_PAGE_SIZE)
  }, [invitations, invitePage])

  const handleUpdateDashboard = async () => {
    const formData = new FormData()
    formData.append('title', dashboardTitle)
    formData.append('color', selectedColor)

    try {
      const res = await updateDashboard(Number(dashboardId), formData)

      if (!res.success) {
        alert(res.error)
        return
      }

      alert('대시보드가 성공적으로 수정되었습니다.')
    } catch (error) {
      console.error('Dashboard update error:', error)
      alert('알 수 없는 오류가 발생했습니다.')
    }
  }

  const handleDeleteDashboard = () => {
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDeleteDashboard = () => {
    console.log('delete dashboard', dashboardId)
    setIsDeleteModalOpen(false)
  }

  const handleDeleteMember = (memberId: number) => {
    setMembers((prev) => {
      const next = prev.filter((member) => member.id !== memberId)
      const nextTotalPages = Math.max(
        1,
        Math.ceil(next.length / MEMBER_PAGE_SIZE),
      )
      if (memberPage > nextTotalPages) setMemberPage(nextTotalPages)
      return next
    })
  }

  const handleCancelInvite = (inviteId: number) => {
    setInvitations((prev) => {
      const next = prev.filter((invite) => invite.id !== inviteId)
      const nextTotalPages = Math.max(
        1,
        Math.ceil(next.length / INVITE_PAGE_SIZE),
      )
      if (invitePage > nextTotalPages) setInvitePage(nextTotalPages)
      return next
    })
  }

  const handleAddInvite = (email: string) => {
    setInvitations((prev) => [{ id: Date.now(), email }, ...prev])
    setInvitePage(1)
  }

  const handleBack = () => {
    router.push(`/dashboard/${dashboardId}`)
  }

  const handleChangeTab = (tab: 'edit' | 'members') => {
    setSelectedTab(tab)
    setIsMobileSidebarOpen(false)
  }

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
              className="fixed top-0 right-0 z-40 h-screen w-screen bg-black/70 md:hidden"
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
                <Menu className="size-5 md:hidden" />
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
                members={pagedMembers}
                invitations={pagedInvitations}
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

'use client';

import {
  DashboardColor,
  initialInvitations,
  initialMembers,
  Invitation,
  Member,
} from "./mock";
import { useMemo, useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardEditSection from "./DashboardEditSection";
import MemberManagementSection from "./MemberManagementSection";
import InviteMemberModal from "./InviteMemberModal";
import { useRouter } from "next/navigation";
import Menu from '@/assets/icons/ic_sidemenu.svg';
import DeleteConfirmModal from "../deleteConfirmModal";

interface DashboardEditClientProps {
  dashboardId: string;
}

const MEMBER_PAGE_SIZE = 5;
const INVITE_PAGE_SIZE = 5;

export default function DashboardEditClient({
  dashboardId,
}: DashboardEditClientProps) {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState<"edit" | "members">("edit");
  const [dashboardTitle, setDashboardTitle] = useState("계란말이 만들기");
  const [selectedColor, setSelectedColor] = useState<DashboardColor>("red");

  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [invitations, setInvitations] = useState<Invitation[]>(initialInvitations);

  const [memberPage, setMemberPage] = useState(1);
  const [invitePage, setInvitePage] = useState(1);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const memberTotalPages = Math.max(1, Math.ceil(members.length / MEMBER_PAGE_SIZE));
  const inviteTotalPages = Math.max(1, Math.ceil(invitations.length / INVITE_PAGE_SIZE));

  const pagedMembers = useMemo(() => {
    const start = (memberPage - 1) * MEMBER_PAGE_SIZE;
    return members.slice(start, start + MEMBER_PAGE_SIZE);
  }, [members, memberPage]);

  const pagedInvitations = useMemo(() => {
    const start = (invitePage - 1) * INVITE_PAGE_SIZE;
    return invitations.slice(start, start + INVITE_PAGE_SIZE);
  }, [invitations, invitePage]);

  const handleUpdateDashboard = () => {
    console.log("dashboard update", {
      dashboardId,
      dashboardTitle,
      selectedColor,
    });
    alert("API 연결 전. 로컬 상태만 변경됨");
  };

  const handleDeleteDashboard = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDeleteDashboard = () => {
    console.log('delete dashboard', dashboardId);
    setIsDeleteModalOpen(false);
  }

  const handleDeleteMember = (memberId: number) => {
    setMembers((prev) => {
      const next = prev.filter((member) => member.id !== memberId);
      const nextTotalPages = Math.max(1, Math.ceil(next.length / MEMBER_PAGE_SIZE));
      if (memberPage > nextTotalPages) setMemberPage(nextTotalPages);
      return next;
    });
  };

  const handleCancelInvite = (inviteId: number) => {
    setInvitations((prev) => {
      const next = prev.filter((invite) => invite.id !== inviteId);
      const nextTotalPages = Math.max(1, Math.ceil(next.length / INVITE_PAGE_SIZE));
      if (invitePage > nextTotalPages) setInvitePage(nextTotalPages);
      return next;
    });
  };

  const handleAddInvite = (email: string) => {
    setInvitations((prev) => [
      { id: Date.now(), email },
      ...prev,
    ]);
    setInvitePage(1);
  };

  const handleBack = () => {
    router.push(`/dashboard/${dashboardId}`);
  };

  const handleChangeTab = (tab: "edit" | "members") => {
    setSelectedTab(tab);
    setIsMobileSidebarOpen(false);
  }

  return (
    <>
      <div className="min-h-screen bg-modal text-white">
        <div className="flex min-h-screen w-full lg:min-w-[1280px] flex-col md:flex-row">
          <div className="hidden md:block">
            <DashboardSidebar
              selectedTab={selectedTab}
              onChangeTab={setSelectedTab}
              onDeleteDashboard={handleDeleteDashboard}
            />
          </div>

          <div
            className={`fixed left-0 top-0 z-50 h-screen w-[70vw] max-w-[320px] transition-transform duration-300 md:hidden ${
              isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
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
              className="fixed right-0 top-0 z-40 h-screen w-[100vw] bg-black/70 md:hidden"
            />
          )}

          <main className="w-full flex-1 bg-modal min-h-screen">
            <header className="w-full flex items-center justify-between border-b border-white/5 lg:h-18 md:h-15 h-[50px] lg:px-[30px] md:px-6 pl-[10px] pr-5">
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(true)}
                className="flex items-center justify-center"
                aria-label="사이드바 열기"
              >
                <Menu className="md:hidden size-5" />
              </button>
            </header>

            {selectedTab === "edit" ? (
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
                onPrevMemberPage={() => setMemberPage((prev) => Math.max(1, prev - 1))}
                onNextMemberPage={() =>
                  setMemberPage((prev) => Math.min(memberTotalPages, prev + 1))
                }
                onPrevInvitePage={() => setInvitePage((prev) => Math.max(1, prev - 1))}
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
import TrashIcon from '@/assets/icons/ic_trash.svg'

interface DashboardSidebarProps {
  selectedTab: 'edit' | 'members'
  onChangeTab: (tab: 'edit' | 'members') => void
  onDeleteDashboard: () => void
}

export default function DashboardSidebar({
  selectedTab,
  onChangeTab,
  onDeleteDashboard,
}: DashboardSidebarProps) {
  return (
    <aside className="bg-black-500 min-h-screen w-full shrink-0 border-b border-white/5 px-4 py-4 md:w-[280px] md:border-r md:border-b-0 md:px-4 lg:w-[330px] xl:w-[540px] xl:pl-60">
      <nav className="mt-[30px] flex flex-col gap-2 md:mt-15 lg:mt-[90px]">
        <button
          type="button"
          onClick={() => onChangeTab('edit')}
          className={`text-2lg-18-medium sm:lg-16px-medium rounded-xl px-4 py-3 text-left text-sm transition ${
            selectedTab === 'edit'
              ? 'bg-white/10 text-white'
              : 'text-gray-300 hover:bg-white/5 hover:text-white'
          }`}
        >
          대시보드 편집
        </button>

        <button
          type="button"
          onClick={() => onChangeTab('members')}
          className={`text-2lg-18-medium sm:lg-16px-medium rounded-xl px-4 py-3 text-left text-sm transition ${
            selectedTab === 'members'
              ? 'bg-white/10 text-white'
              : 'text-gray-300 hover:bg-white/5 hover:text-white'
          }`}
        >
          멤버 관리
        </button>

        <span className="border-modal border-b" />
        <button
          type="button"
          onClick={onDeleteDashboard}
          className="text-2lg-18-medium sm:text-2lg-18-medium mt-2 flex items-center justify-between px-4 py-3 text-left text-red-500 hover:text-red-400"
        >
          대시보드 삭제하기
          <TrashIcon />
        </button>
      </nav>
    </aside>
  )
}

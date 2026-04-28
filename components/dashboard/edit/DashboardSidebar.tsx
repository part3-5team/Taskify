import TrashIcon from '@/assets/icons/ic_trash.svg';

interface DashboardSidebarProps {
  selectedTab: "edit" | "members";
  onChangeTab: (tab: "edit" | "members") => void;
  onDeleteDashboard: () => void;
}

export default function DashboardSidebar({
  selectedTab,
  onChangeTab,
  onDeleteDashboard,
}: DashboardSidebarProps) {
  return (
    <aside className="md:max-w-[250px] lg:min-w-[540px] md:w-full min-h-[100%] shrink-0 border-b border-white/5 bg-black-500 px-4 py-4 md:w-[180px] md:border-b-0 md:border-r md:px-3 lg:w-[220px] md:px-4">
      <nav className="flex flex-col gap-2 lg:w-[280px] lg:ml-auto lg:mt-[90px] md:mt-15 mt-[30px]">
        <button
          type="button"
          onClick={() => onChangeTab("edit")}
          className={`rounded-xl px-4 py-3 text-left text-sm transition text-2lg-18-medium sm:lg-16px-medium ${
            selectedTab === "edit"
              ? "bg-white/10 text-white"
              : "text-gray-300 hover:bg-white/5 hover:text-white"
          }`}
        >
          대시보드 편집
        </button>

        <button
          type="button"
          onClick={() => onChangeTab("members")}
          className={`rounded-xl px-4 py-3 text-left text-sm transition text-2lg-18-medium sm:lg-16px-medium ${
            selectedTab === "members"
              ? "bg-white/10 text-white"
              : "text-gray-300 hover:bg-white/5 hover:text-white"
          }`}
        >
          멤버 관리
        </button>

        <span className='border-b border-modal' />
        <button
          type="button"
          onClick={onDeleteDashboard}
          className="flex items-center justify-between mt-2 px-4 py-3 text-left text-2lg-18-medium sm:text-2lg-18-medium  text-red-500 hover:text-red-400"
        >
          대시보드 삭제하기
          <TrashIcon />
        </button>
      </nav>
    </aside>
  )
}
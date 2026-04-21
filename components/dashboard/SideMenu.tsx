import Logo from '@/components/common/Logo'
import DashboardSelector from '@/components/dashboard/DashboardSelector'
import DashboardList from '@/components/dashboard/DashboardList'
import ProfileImageSection from '@/components/profile/ProfileImageSection'

export default function SideMenu() {
  return (
    <aside className="flex flex-col w-[300px] min-h-screen border-r border-gray-900 bg-black-500 py-2">
      <Logo />
      <DashboardSelector />
      <DashboardList />
      <div className="mt-auto">
        <ProfileImageSection />
      </div>
    </aside>
  )
}

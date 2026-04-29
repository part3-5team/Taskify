'use client'
import type { Dashboard } from '@/libs/types/Dashboard'
import IconPlusSquare from '@/assets/icons/ic_plus_square.svg'
import IconLeftArrow from '@/assets/icons/ic_chevron_left.svg'
import IconRightArrow from '@/assets/icons/ic_chevorn_right.svg'
import { useState } from 'react'
import DashboardCreateModal from '@/components/mydashboard/CreateModal'
import DashboardCard from '@/components/mydashboard/DashboardCard'

type DashboardListProps = {
  dashboards: Dashboard[]
}

export default function DashboardList({ dashboards }: DashboardListProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [desktopPage, setDesktopPage] = useState(1)
  const [mobilePage, setMobilePage] = useState(1)
  // 데스크톱/모바일 페이지 개별로 계산
  const desktopItemsPerPage = 3
  const mobileItemsPerPage = 1

  const desktopTotalPages = Math.max(
    1,
    Math.ceil(dashboards.length / desktopItemsPerPage),
  )

  const mobileTotalPages = Math.max(
    1,
    Math.ceil(dashboards.length / mobileItemsPerPage),
  )

  const desktopDashboards = dashboards.slice(
    (desktopPage - 1) * desktopItemsPerPage,
    desktopPage * desktopItemsPerPage,
  )

  const mobileDashboards = dashboards.slice(
    (mobilePage - 1) * mobileItemsPerPage,
    mobilePage * mobileItemsPerPage,
  )

  const handlePrevDesktopPage = () => {
    setDesktopPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextDesktopPage = () => {
    setDesktopPage((prev) => Math.min(prev + 1, desktopTotalPages))
  }

  const handlePrevMobilePage = () => {
    setMobilePage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextMobilePage = () => {
    setMobilePage((prev) => Math.min(prev + 1, mobileTotalPages))
  }

  return (
    <div>
      {/* 모바일 / 태블릿 */}
      <div className="mb-5 grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="bg-black-400 text-2lg-18-bold hover:bg-black-300 flex h-20 cursor-pointer items-center justify-center gap-2.5 rounded-[20px] border-2 border-dashed border-gray-700 px-5"
        >
          새로운 대시보드
          <IconPlusSquare className="shrink-0 text-gray-700" />
        </button>

        {mobileDashboards.map((dashboard) => (
          <DashboardCard key={dashboard.id} dashboard={dashboard} />
        ))}
      </div>

      {/* 데스크톱 */}
      <div className="mb-5 hidden w-full grid-cols-4 gap-5 lg:grid">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="bg-black-400 text-2lg-18-bold hover:bg-black-300 flex h-20 cursor-pointer items-center justify-center gap-2.5 rounded-[20px] border-2 border-dashed border-gray-700 px-5"
        >
          새로운 대시보드
          <IconPlusSquare className="shrink-0 text-gray-700" />
        </button>

        {desktopDashboards.map((dashboard) => (
          <DashboardCard key={dashboard.id} dashboard={dashboard} />
        ))}
      </div>

      {isOpen && <DashboardCreateModal onClose={() => setIsOpen(false)} />}

      {/* 모바일 / 태블릿 페이지네이션 */}
      <div className="text-lg-16-semibold flex items-center justify-end gap-5 px-5 lg:hidden">
        {mobilePage} of {mobileTotalPages}
        <button
          type="button"
          onClick={handlePrevMobilePage}
          disabled={mobilePage === 1}
          className="group hover:bg-black-300 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md disabled:cursor-default disabled:hover:bg-transparent"
        >
          <IconLeftArrow className="h-6 w-6 group-disabled:text-gray-500" />
        </button>
        <button
          type="button"
          onClick={handleNextMobilePage}
          disabled={mobilePage === mobileTotalPages}
          className="group hover:bg-black-300 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md disabled:cursor-default disabled:hover:bg-transparent"
        >
          <IconRightArrow className="h-6 w-6 group-disabled:text-gray-500" />
        </button>
      </div>

      {/* 데스크톱 페이지네이션 */}
      <div className="text-lg-16-semibold hidden items-center justify-end gap-5 px-5 lg:flex">
        {desktopPage} of {desktopTotalPages}
        <button
          type="button"
          onClick={handlePrevDesktopPage}
          disabled={desktopPage === 1}
          className="group hover:bg-black-300 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md disabled:cursor-default disabled:hover:bg-transparent"
        >
          <IconLeftArrow className="h-6 w-6 group-disabled:text-gray-500" />
        </button>
        <button
          type="button"
          onClick={handleNextDesktopPage}
          disabled={desktopPage === desktopTotalPages}
          className="group hover:bg-black-300 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md disabled:cursor-default disabled:hover:bg-transparent"
        >
          <IconRightArrow className="h-6 w-6 group-disabled:text-gray-500" />
        </button>
      </div>
    </div>
  )
}

'use client'

import type { Dashboard } from '@/libs/types/Dashboard'
import IconPlusSquare from '@/assets/icons/ic_plus_square.svg'
import IconLeftArrow from '@/assets/icons/ic_chevron_left.svg'
import IconRightArrow from '@/assets/icons/ic_chevorn_right.svg'
import { useEffect, useState } from 'react'
import DashboardCard from '@/components/mydashboard/DashboardCard'
import CreateModalTrigger from '@/components/dashboard/CreateModalTrigger'

type DashboardListProps = {
  dashboards: Dashboard[]
}

const getItemsPerPage = () => {
  if (typeof window === 'undefined') return 1

  if (window.matchMedia('(min-width: 1024px)').matches) {
    return 3 // 데스크톱: 생성 버튼 + 대시보드 3개 = 4칸
  }

  return 1 // 모바일: 생성 버튼 + 대시보드 1개
}

export default function DashboardList({ dashboards }: DashboardListProps) {
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(1)

  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(getItemsPerPage())
    }

    updateItemsPerPage()

    window.addEventListener('resize', updateItemsPerPage)

    return () => {
      window.removeEventListener('resize', updateItemsPerPage)
    }
  }, [])

  const totalPages = Math.max(1, Math.ceil(dashboards.length / itemsPerPage))

  const currentPage = Math.min(page, totalPages)

  const currentDashboards = dashboards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const handlePrevPage = () => {
    setPage(Math.max(currentPage - 1, 1))
  }

  const handleNextPage = () => {
    setPage(Math.min(currentPage + 1, totalPages))
  }

  return (
    <div>
      <div className="mb-5 grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        <CreateModalTrigger
          type="button"
          className="bg-black-400 text-2lg-18-bold hover:bg-black-300 flex h-20 cursor-pointer items-center justify-center gap-2.5 rounded-[20px] border-2 border-dashed border-gray-700 px-5"
        >
          새로운 대시보드
          <IconPlusSquare className="shrink-0 text-gray-700" />
        </CreateModalTrigger>

        {currentDashboards.map((dashboard) => (
          <DashboardCard key={dashboard.id} dashboard={dashboard} />
        ))}
      </div>
      {/* 페이지네이션 */}
      <div className="text-lg-16-semibold flex items-center justify-end gap-5 px-5">
        {currentPage} of {totalPages}
        <button
          type="button"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="group hover:bg-black-300 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md disabled:cursor-default disabled:hover:bg-transparent"
        >
          <IconLeftArrow className="h-6 w-6 group-disabled:text-gray-500" />
        </button>
        <button
          type="button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="group hover:bg-black-300 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md disabled:cursor-default disabled:hover:bg-transparent"
        >
          <IconRightArrow className="h-6 w-6 group-disabled:text-gray-500" />
        </button>
      </div>
    </div>
  )
}

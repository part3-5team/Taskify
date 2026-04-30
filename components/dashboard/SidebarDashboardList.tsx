'use client'

import { useState } from 'react'
import SidebarDashboardItem from './SidebarDashboardItem'
import { Dashboard } from '@/libs/types/Dashboard'

interface SidebarDashboardListProps {
  dashboards: Dashboard[]
}

const ITEMS_PER_PAGE = 14

export default function SidebarDashboardList({
  dashboards,
}: SidebarDashboardListProps) {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(dashboards.length / ITEMS_PER_PAGE)
  const pagedItems = dashboards.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  )

  return (
    <>
      {/* 네비게이션 */}
      <nav className="mt-1 flex-1">
        <ul className="m-0 list-none p-0">
          {pagedItems.map((dashboard) => (
            <SidebarDashboardItem
              key={dashboard.id}
              label={dashboard.title}
              href={`/dashboard/${dashboard.id}`}
              color={dashboard.color}
              createdByMe={dashboard.createdByMe}
            />
          ))}
        </ul>
      </nav>

      {/* 페이지네이션 (대시보드가 14개 초과일 때만 표시) */}
      {totalPages > 1 && (
        <div className="text-xs-12-medium flex items-center justify-between px-6 py-4 text-gray-400">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="cursor-pointer border-none bg-transparent text-gray-400 hover:text-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
          >
            &lt; 이전
          </button>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="cursor-pointer border-none bg-transparent text-gray-400 hover:text-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
          >
            다음 &gt;
          </button>
        </div>
      )}
    </>
  )
}

'use client'

import { useState } from 'react'
import SidebarDashboardItem from './SidebarDashboardItem'

interface NavItem {
  label: string
  href: string
}

const ITEMS_PER_PAGE = 14

// 대시보드 목록 나중에 불러올거 대비하여 구조 설정, 임시 mock데이터 넣어놨어용
const NAV_ITEMS: NavItem[] = [
  { label: '내 대시보드', href: '/mydashboard' },
  { label: '프로젝트 A', href: '/dashboard/1' },
  { label: '프로젝트 B', href: '/dashboard/2' },
  { label: '프로젝트 C', href: '/dashboard/3' },
  { label: '디자인 시스템', href: '/dashboard/4' },
  { label: '백엔드 API', href: '/dashboard/5' },
  { label: '마케팅 플랜', href: '/dashboard/6' },
  { label: '스프린트 보드', href: '/dashboard/7' },
  { label: 'QA 체크리스트', href: '/dashboard/8' },
  { label: '런치 준비', href: '/dashboard/9' },
  { label: '인프라 설계', href: '/dashboard/10' },
  { label: 'UI 컴포넌트', href: '/dashboard/11' },
  { label: '사용자 리서치', href: '/dashboard/12' },
  { label: '회고 보드', href: '/dashboard/13' },
  { label: '로드맵 2025', href: '/dashboard/14' },
  { label: '팀 온보딩', href: '/dashboard/15' },
  { label: '버그 트래커', href: '/dashboard/16' },
  { label: '릴리즈 노트', href: '/dashboard/17' },
]

export default function SidebarDashboardList() {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(NAV_ITEMS.length / ITEMS_PER_PAGE)
  const pagedItems = NAV_ITEMS.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  )

  return (
    <>
      {/* 네비게이션 */}
      <nav className="mt-1 flex-1">
        <ul className="m-0 list-none p-0">
          {pagedItems.map((item, index) => (
            <SidebarDashboardItem key={index} label={item.label} href={item.href} />
          ))}
        </ul>
      </nav>

      {/* 페이지네이션 */}
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
    </>
  )
}

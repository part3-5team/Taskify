'use client'

import { useState } from 'react'
import Link from 'next/link'
import Logo from '@/assets/imgs/img_Logo.svg'
import HashIcon from '@/assets/icons/ic_hash.svg'
import PlusIcon from '@/assets/icons/ic_plus.svg'
import SettingIcon from '@/assets/icons/ic_setting.svg'

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

export default function SideMenu() {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(NAV_ITEMS.length / ITEMS_PER_PAGE)
  const pagedItems = NAV_ITEMS.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <aside className="flex flex-col w-[300px] min-h-screen border-r border-gray-900 bg-black-500 py-2">
      {/* 로고 부분 */}
      <div className="px-1 pb-1 border-gray-900">
        <Link href="/mydashboard">
          <Logo className="w-40 h-15" />
        </Link>
      </div>

      {/* 대시보드 목록 헤더 (대시보드 추가 +) */}
      <div className="flex items-center justify-between px-6 pb-1">
        <span className="text-sm-13-semibold text-gray-400">
          대시보드 추가
        </span>
        <button
          type="button"
          aria-label="대시보드 추가"
          className="flex items-center justify-center text-gray-400 hover:text-gray-100 bg-transparent border-none cursor-pointer"
        >
          <PlusIcon className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* 네비게이션 */}
      <nav className="flex-1 mt-1">
        <ul className="list-none m-0 p-0">
          {pagedItems.map((item, index) => (
            <li key={index} className="mb-1">
              <Link
                href={item.href}
                className="flex items-center gap-2 px-6 py-2.5 text-md-14-medium text-gray-100 no-underline hover:bg-black-300 hover:text-gray-100"
              >
                <HashIcon className="w-5 h-5 shrink-0" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* 페이지네이션 */}
      <div className="flex items-center justify-between px-6 py-4 text-xs-12-medium text-gray-400">
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="bg-transparent border-none cursor-pointer text-gray-400 hover:text-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          &lt; 이전
        </button>
        <button
          type="button"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="bg-transparent border-none cursor-pointer text-gray-400 hover:text-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          다음 &gt;
        </button>
      </div>

      {/* 하단 프로필 */}
      <div className="border-t border-gray-900 px-5 py-4 flex items-center gap-3">
        {/* 임시 프로필 이미지 */}
        <div className="w-8 h-8 rounded-full bg-gray-700 shrink-0" />
        <span className="flex-1 text-md-14-medium text-gray-100">
          프로필 이름
        </span>
        {/* 설정 아이콘 */}
        <button
          type="button"
          aria-label="설정"
          className="flex items-center justify-center text-gray-400 hover:text-gray-100 bg-transparent border-none cursor-pointer shrink-0"
        >
          <SettingIcon className="w-5 h-5" />
        </button>
      </div>
    </aside>
  )
}

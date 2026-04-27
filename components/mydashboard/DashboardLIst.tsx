'use client'
import type { Dashboard } from '@/libs/types/Dashboard'
import IconPlusSquare from '@/assets/icons/ic_plus_square.svg'
import IconLeftArrow from '@/assets/icons/ic_chevron_left.svg'
import IconRightArrow from '@/assets/icons/ic_chevorn_right.svg'
import IconHash from '@/assets/icons/ic_hash.svg'
import Link from 'next/link'
import { useState } from 'react'
import DashboardCreateModal from './CreateModal'

type DashboardListProps = {
  dashboards: Dashboard[]
}

const itemsPerPage = 4

export default function DashboardList({ dashboards }: DashboardListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const cards = [
    {
      type: 'create' as const,
      id: 'create',
    },
    ...dashboards.map((dashboard) => ({
      type: 'dashboard' as const,
      id: dashboard.id,
      dashboard,
    })),
  ]

  const totalPages = Math.ceil(cards.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const currentCards = cards.slice(startIndex, endIndex)

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  return (
    <div>
      <div className="mb-5 grid w-full grid-cols-4 gap-5">
        {currentCards.map((card) => {
          if (card.type === 'create') {
            return (
              <button
                key={card.id}
                onClick={() => setIsOpen(true)}
                className="bg-black-400 text-2lg-18-bold hover:bg-black-300 flex h-20 flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-[20px] border-2 border-dashed border-gray-700 px-5"
              >
                새로운 대시보드
                <IconPlusSquare className="text-gray-700" />
              </button>
            )
          }

          return (
            <Link
              key={card.dashboard.id}
              href={`/dashboard/${card.dashboard.id}`}
              className="bg-black-300 text-2lg-18-bold hover:bg-black-200 flex h-20 items-center justify-between gap-2.5 rounded-[20px] border border-gray-700 px-5"
            >
              <div className="flex items-center gap-2">
                <IconHash style={{ color: card.dashboard.color }} />
                <span>{card.dashboard.title}</span>
                {card.dashboard.createdByMe && <span>👑</span>}
              </div>

              <IconRightArrow className="h-6 w-6 text-gray-400" />
            </Link>
          )
        })}
      </div>
      {isOpen && <DashboardCreateModal onClose={() => setIsOpen(false)} />}
      <div className="text-lg-16-semibold flex items-center justify-end gap-5 px-5">
        {currentPage} of {totalPages}
        <button
          type="button"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="group hover:bg-black-300 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md"
        >
          <IconLeftArrow className="h-6 w-6 group-disabled:text-gray-500" />
        </button>
        <button
          type="button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="group hover:bg-black-300 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md"
        >
          <IconRightArrow className="h-6 w-6 group-disabled:text-gray-500" />
        </button>
      </div>
    </div>
  )
}

'use client'

import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import IconPlus from '@/assets/icons/ic_plus.svg'
import IconSetting from '@/assets/icons/ic_setting.svg'
import PopdoverMenu from '@/components/common/PopdoverMenu/index'

interface ColumnProps {
  id: string
  title: string
  children?: React.ReactNode
  cardCount: number
  onAddCard?: () => void
  onEditClick?: () => void
  onDeleteClick?: () => void
}

export default function Column({
  id,
  title,
  children,
  cardCount,
  onAddCard,
  onEditClick,
  onDeleteClick,
}: ColumnProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const toggleMenu = () => setIsMenuOpen((prev) => !prev)

  const { setNodeRef, isOver } = useDroppable({
    id: id,
  })

  const handleEditClick = () => {
    onEditClick?.()
    setIsMenuOpen(false)
  }

  const handleDeleteClick = () => {
    onDeleteClick?.()
    setIsMenuOpen(false)
  }

  return (
    <div className="flex h-full w-full flex-shrink-0 flex-col lg:w-[350px]">
      {/* 컬럼 헤더 */}
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-2">
          {/* TODO: 제목 왼쪽 동그란 점 */}
          <h2 className="text-lg-16-semibold text-gray-100">{title}</h2>
          <h2 className="text-lg-16-bold text-gray-400">{cardCount}</h2>
        </div>

        {/* 플러스 및 설정 아이콘 */}
        <div className="flex items-center gap-3">
          <button
            aria-label="카드 추가"
            className="hover:bg-black-300 rounded-md p-1 transition-colors"
            onClick={onAddCard}
          >
            <IconPlus className="text-brand-500 h-5 w-5" />
          </button>

          {/* 설정 아이콘 */}
          <div className="relative">
            <button
              aria-label="컬럼 설정"
              className="hover:bg-black-300 rounded-md p-1 transition-colors"
              onClick={toggleMenu}
            >
              <IconSetting className="h-5 w-5 text-gray-400" />
            </button>

            {/* 절대좌표 */}
            {isMenuOpen && (
              <div className="absolute top-full right-0 z-10 mt-2">
                <PopdoverMenu
                  onClose={() => setIsMenuOpen(false)}
                  onEditClick={handleEditClick}
                  onDeleteClick={handleDeleteClick}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. 카드 추가 버튼 영역 */}
      <div className="px-5 pb-4">{/* 카드 */}</div>

      {/* 3. 카드가 들어갈 영역 (스크롤 가능) */}
      <div
        ref={setNodeRef}
        className={`flex h-full flex-col gap-3 overflow-y-auto px-5 pb-5 ${
          isOver ? 'bg-black-300 rounded-lg transition-colors' : ''
        }`}
      >
        {children}
      </div>
    </div>
  )
}

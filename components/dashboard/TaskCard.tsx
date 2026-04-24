// components/dashboard/TaskCard.tsx
'use client'
import React from 'react'
import { useDraggable, useDroppable } from '@dnd-kit/core'

interface TagData {
  id: number
  label: string
}

interface TaskCardProps {
  id: string
  title: string
  tags?: TagData[]
  dueDate?: string
  assigneeName?: string
  hasImage?: boolean
  isOverlay?: boolean
}

export default function TaskCard({
  id,
  title,
  tags = [],
  dueDate,
  assigneeName,
  hasImage = false,
  isOverlay = false,
}: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    isDragging,
  } = useDraggable({
    id: id,
    data: { id },
    disabled: isOverlay,
  })

  // 카드 자체가 드롭 타겟이 되도록 설정! (그래야 맨 아래로 안 떨어지고 자리 끼워넣기가 됨)
  const { setNodeRef: setDroppableRef } = useDroppable({
    id: id,
    disabled: isOverlay,
  })

  // 드래그와 드롭의 ref를 동시에 연결
  const setNodeRef = (node: HTMLElement | null) => {
    setDraggableRef(node)
    setDroppableRef(node)
  }

  return (
    <div
      ref={isOverlay ? undefined : setNodeRef}
      {...(isOverlay ? {} : listeners)}
      {...(isOverlay ? {} : attributes)}
      className={`border-black-200 cursor-grab rounded-xl border p-4 transition-all ${
        isDragging && !isOverlay
          ? 'opacity-30'
          : 'bg-black-300 hover:bg-black-200'
      } ${isOverlay ? 'cursor-grabbing shadow-xl' : ''}`}
    >
      {/* 1. 이미지 (썸네일) 영역 - 일단 회색 박스로 대체 */}
      {hasImage && (
        <div className="bg-black-200 mb-3 h-[160px] w-full rounded-lg"></div>
      )}

      {/* 2. 카드 제목 */}
      <h3 className="text-lg-16-medium mb-3 text-gray-100">{title}</h3>

      {/* 3. 태그 뱃지 */}
      {tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => {
            let colorClasses = 'bg-brand-500 text-white'
            if (tag.label === '프로젝트')
              colorClasses = 'bg-profile-blue text-white'
            else if (tag.label === '일정')
              colorClasses = 'bg-profile-yellow text-white'
            else if (tag.label === '공부')
              colorClasses = 'bg-profile-cyan text-white'
            else if (tag.label === '버그')
              colorClasses = 'bg-red-500 text-white'

            return (
              <span
                key={tag.id}
                className={`text-xs-12-medium rounded px-2 py-0.5 ${colorClasses}`}
              >
                {tag.label}
              </span>
            )
          })}
        </div>
      )}

      {/* 4. 날짜와 담당자 영역 */}
      <div className="mt-4 flex flex-col gap-2">
        {/* 날짜 */}
        <span className="text-xs-12-medium text-gray-500">
          {dueDate || '날짜 미정'}
        </span>

        {/* 담당자 아바타 (임시 원형 프로필) */}
        {assigneeName && (
          <div className="flex items-center gap-1.5">
            <div className="bg-profile-violet flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold text-white">
              {assigneeName.charAt(0)}
            </div>
            <span className="text-xs-12-medium text-gray-500">
              {assigneeName}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

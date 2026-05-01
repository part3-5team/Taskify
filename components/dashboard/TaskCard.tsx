// components/dashboard/TaskCard.tsx
'use client'
import React from 'react'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import DefaultProfileImg from '@/assets/imgs/img_default_profile.svg'

interface TaskCardProps {
  id: number | string
  title: string
  tags?: string[]
  dueDate?: string
  assigneeName?: string
  assigneeProfileImageUrl?: string | null
  imageUrl?: string | null
  hasImage?: boolean
  isOverlay?: boolean
  onClick?: () => void
}

export default function TaskCard({
  id,
  title,
  tags = [],
  dueDate,
  assigneeName,
  assigneeProfileImageUrl,
  imageUrl,
  hasImage = false,
  isOverlay = false,
  onClick,
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

  const shouldShowImage = Boolean(imageUrl) || hasImage

  const getDay = (dueDate?: string): string | null => {
    if (!dueDate) return null

    const today = new Date()
    const due = new Date(dueDate)

    today.setHours(0, 0, 0, 0)
    due.setHours(0, 0, 0, 0)

    const diff = Math.ceil(
      (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    )

    if (diff < 0) return null
    if (diff > 3) return null

    return diff === 0 ? 'D-Day' : `D-${diff}`
  }

  const dDay = getDay(dueDate)
  const isUrgent = dDay === 'D-1'

  return (
    <div
      ref={isOverlay ? undefined : setNodeRef}
      {...(isOverlay ? {} : listeners)}
      {...(isOverlay ? {} : attributes)}
      onClick={isOverlay ? undefined : onClick}
      className={`border-black-200 relative cursor-grab rounded-xl border p-4 transition-all ${
        isUrgent ? 'border-red-400' : 'border-none'
      } ${
        isDragging && !isOverlay
          ? 'opacity-30'
          : 'bg-black-300 hover:bg-black-200'
      } ${isOverlay ? 'cursor-grabbing shadow-xl' : ''}`}
    >
      {/* 디데이 뱃지 */}
      {typeof dDay === 'string' && dDay.length > 0 && (
        <span className="text-xs-12-semibold absolute top-3 right-3 rounded-2xl bg-red-400 px-2 py-0.5 text-white">
          {dDay}
        </span>
      )}

      {/* 1. 이미지 (썸네일) 영역 - 일단 회색 박스로 대체 */}
      {shouldShowImage && (
        <div className="mb-3 h-[160px] w-full rounded-lg">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="할 일 이미지"
              className="h-full w-full object-cover"
            />
          )}
        </div>
      )}

      {/* 2. 카드 제목 */}
      <h3 className="text-lg-16-medium mb-3 text-gray-100">{title}</h3>

      {/* 3. 태그 뱃지 */}
      {tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {tags.map((tag, idx) => {
            let colorClasses = 'bg-brand-500 text-white'

            if (tag === '프로젝트') colorClasses = 'bg-profile-blue text-white'
            else if (tag === '일정')
              colorClasses = 'bg-profile-yellow text-white'
            else if (tag === '공부') colorClasses = 'bg-profile-cyan text-white'
            else if (tag === '버그') colorClasses = 'bg-red-500 text-white'

            return (
              <span
                key={`${idx}-${tag}`}
                className={`text-xs-12-medium rounded px-2 py-0.5 ${colorClasses}`}
              >
                {tag}
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
            {assigneeProfileImageUrl ? (
              <img
                src={assigneeProfileImageUrl}
                alt="담당자 프로필"
                className="h-6 w-6 rounded-full object-cover"
              />
            ) : (
              <DefaultProfileImg className="h-6 w-6 rounded-full bg-white" />
            )}
            <span className="text-xs-12-medium text-gray-500">
              {assigneeName}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

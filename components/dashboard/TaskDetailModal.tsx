'use client'

import React, { useState } from 'react'
import ModalLayout from '@/components/common/modal/ModalLayout'
import IconMore from '@/assets/icons/ic_more.svg'
import IconX from '@/assets/icons/ic_X.svg'
import PopdoverMenu from '@/components/common/PopdoverMenu'
import CommentInput from '@/components/common/comment'

interface TagData {
  id: number
  label: string
}

interface CardData {
  id: string
  title: string
  tags?: TagData[]
  dueDate?: string
  assigneeName?: string
  hasImage?: boolean
}

interface TaskDetailModalProps {
  task: CardData
  columnTitle: string
  onClose: () => void
}

const INITIAL_COMMENTS = [
  {
    id: 1,
    author: '김정은',
    date: '2025년 7월 18일 오전 9:00',
    content: 'Comment Text',
    authorInitial: '정',
  },
]

export default function TaskDetailModal({
  task,
  columnTitle,
  onClose,
}: TaskDetailModalProps) {
  const [comments, setComments] = useState(INITIAL_COMMENTS)
  const [showMenu, setShowMenu] = useState(false)

  // 태그의 색상을 지정하는 헬퍼 함수
  const getTagColor = (label: string) => {
    if (label === '프로젝트') return 'bg-profile-blue text-white'
    if (label === '일정') return 'bg-profile-yellow text-white'
    if (label === '공부') return 'bg-profile-cyan text-white'
    if (label === '버그') return 'bg-red-500 text-white'
    return 'bg-brand-500 text-white'
  }

  const handleCreateComment = (value: string) => {
    const newComment = {
      id: Date.now(),
      author: '박보검',
      date: new Date().toLocaleString(),
      content: value,
      authorInitial: '박',
    }
    setComments((prev) => [newComment, ...prev])
  }

  return (
    <ModalLayout
      onClose={onClose}
      className="flex w-full max-w-[730px] flex-col overflow-hidden text-left md:flex-row"
    >
      {/* 1. 메인 콘텐츠 영역 (왼쪽) */}
      <div className="flex-1 p-7.5">
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-2xl-24-bold text-gray-100">{task.title}</h2>

          {/* 모바일용 헤더 버튼 (md:hidden) */}
          <div className="flex gap-2 md:hidden">
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-100"
              >
                <IconMore className="h-4 w-4" />
              </button>
              {showMenu && (
                <div className="absolute top-full right-0 z-10 mt-1">
                  <PopdoverMenu
                    onClose={() => setShowMenu(false)}
                    onEditClick={() => setShowMenu(false)}
                    onDeleteClick={() => setShowMenu(false)}
                  />
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-100"
            >
              <IconX className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* 태그 리스트 */}
        {task.tags && task.tags.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-1.5 border-b border-gray-700 pb-6">
            {task.tags.map((tag) => (
              <span
                key={tag.id}
                className={`text-xs-12-medium rounded px-2 py-0.5 ${getTagColor(tag.label)}`}
              >
                {tag.label}
              </span>
            ))}
          </div>
        )}

        <div className="mb-6">
          <p className="text-md-15-medium leading-relaxed whitespace-pre-wrap text-gray-300">
            먼저 전체 플로우를 개괄적으로 파악하고, 주요 화면 구성을 나열 초기
            와이어프레임은 빠르게 그리고, 이후 단계에서 세부 요소를 보완합니다.
          </p>
        </div>

        {/* task 이미지 예시 */}
        {task.hasImage && (
          <div className="bg-black-200 mb-6 flex h-[260px] items-center justify-center rounded-xl border border-gray-700 p-8">
            <div className="flex h-full w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-600 bg-gray-800">
              <span className="text-gray-500">Image Area</span>
            </div>
          </div>
        )}

        <div className="mt-6 md:hidden">
          <hr className="mb-6 border-gray-700" />
          <div className="mb-8 grid grid-cols-2 gap-6 lg:grid-cols-3">
            <div>
              <h4 className="mb-2 text-[10px] font-bold text-gray-500 uppercase">
                담당자
              </h4>
              <div className="flex items-center gap-2">
                <div className="bg-profile-green flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white">
                  {task.assigneeName?.charAt(0) || 'U'}
                </div>
                <span className="text-xs-12-medium text-gray-200">
                  {task.assigneeName || '미지정'}
                </span>
              </div>
            </div>
            <div>
              <h4 className="mb-2 text-[10px] font-bold text-gray-500 uppercase">
                상태
              </h4>
              <div className="flex items-center gap-2">
                <div className="bg-profile-violet h-1.5 w-1.5 rounded-full" />
                <span className="text-xs-12-medium text-gray-200">
                  {columnTitle}
                </span>
              </div>
            </div>
            <div>
              <h4 className="mb-2 text-[10px] font-bold text-gray-500 uppercase">
                마감일
              </h4>
              <p className="text-xs-12-medium text-gray-200">
                {task.dueDate || '미정'}
              </p>
            </div>
          </div>
        </div>

        {/* 댓글 입력 영역 (공용 컴포넌트 사용) */}
        <div className="mb-6">
          <CommentInput profileName="정" onSubmit={handleCreateComment} />
        </div>

        {/* 댓글 리스트 영역 */}
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3">
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">
                {c.authorInitial}
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs-12-semibold text-gray-100">
                      {c.author}
                    </span>
                    <span className="text-[10px] text-gray-600">{c.date}</span>
                  </div>
                  <div className="flex gap-2 text-[10px] text-gray-600">
                    <button className="hover:underline">수정</button>
                    <button className="hover:underline">삭제</button>
                  </div>
                </div>
                <p className="text-sm-13-medium text-gray-200">{c.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. 사이드바 영역 (데스크탑 전용) */}
      <div className="hidden w-[180px] border-l border-gray-700 p-5 md:block">
        <div className="mb-6 flex justify-end gap-2">
          {/* 더보기 버튼 및 메뉴 */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-100"
            >
              <IconMore className="h-4 w-4" />
            </button>
            {showMenu && (
              <div className="absolute top-full right-0 z-10 mt-1">
                <PopdoverMenu
                  onClose={() => setShowMenu(false)}
                  onEditClick={() => setShowMenu(false)}
                  onDeleteClick={() => setShowMenu(false)}
                />
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-100"
          >
            <IconX className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* 담당자 섹션 */}
          <div>
            <h4 className="mb-2 text-[10px] font-bold text-gray-500 uppercase">
              담당자
            </h4>
            <div className="flex items-center gap-2">
              <div className="bg-profile-green flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white">
                {task.assigneeName?.charAt(0) || 'U'}
              </div>
              <span className="text-xs-12-medium text-gray-200">
                {task.assigneeName || '미지정'}
              </span>
            </div>
          </div>

          {/* 상태 섹션 */}
          <div>
            <h4 className="mb-2 text-[10px] font-bold text-gray-500 uppercase">
              상태
            </h4>
            <div className="flex items-center gap-2">
              <div className="bg-profile-violet h-1.5 w-1.5 rounded-full" />
              <span className="text-xs-12-medium text-gray-200">
                {columnTitle}
              </span>
            </div>
          </div>

          {/* 마감일 섹션 */}
          <div>
            <h4 className="mb-2 text-[10px] font-bold text-gray-500 uppercase">
              마감일
            </h4>
            <p className="text-xs-12-medium text-gray-200">
              {task.dueDate || '미정'}
            </p>
          </div>
        </div>
      </div>
    </ModalLayout>
  )
}

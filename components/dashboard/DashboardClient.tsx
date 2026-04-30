'use client'

import React, { useState, useEffect } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core'
import Column from '@/components/dashboard/Column'
import Card from '@/components/dashboard/TaskCard'
import AddColumnButton from '@/components/dashboard/AddColumnButton'
import TaskDetailModal from '@/components/dashboard/TaskDetailModal'
import TaskCreateModal from '@/components/dashboard/TaskCreateModal'
import { getCards } from '@/libs/api/cards/getCards'
import type { CardDetail } from '@/libs/types/Card'

interface DashboardClientProps {
  dashboardId: number
  dashboardTitle: string
  columns: {
    id: number
    title: string
  }[]
}

type TagData = {
  id: number
  label: string
}

type CardData = {
  id: number
  title: string
  tags?: TagData[]
  dueDate?: string
  assigneeName?: string
  hasImage?: boolean
}

type ColumnData = {
  id: number
  title: string
  cards: CardData[]
  cursorId: number | null
  hasMore: boolean
}

export default function DashboardClient({
  dashboardId,
  dashboardTitle,
}: DashboardClientProps) {
  const [columns, setColumns] = useState<ColumnData[]>([])
  const [activeCardData, setActiveCardData] = useState<CardData | null>(null)
  const [selectedTask, setSelectedTask] = useState<CardData | null>(null)
  const [selectedTaskColumnTitle, setSelectedTaskColumnTitle] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedColumnId, setSelectedColumnId] = useState<number | null>(null)

  // SSR Hydration 에러 방지용
  const [isMounted, setIsMounted] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px 이상 움직여야 드래그로 간주
      },
    }),
  )

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null // 클라이언트 측 마운트 전에는 렌더링 무시
  }

  const convertCardDetailToCardData = (card: CardDetail): CardData => {
    return {
      id: card.id,
      title: card.title,
      tags: card.tags.map((tag, idx) => ({
        id: idx + 1,
        label: tag,
      })),
      dueDate: card.dueDate ?? undefined,
      assigneeName: card.assignee?.nickname,
      hasImage: Boolean(card.imageUrl),
    }
  }

  const handleCreateCard = (newCard: CardDetail) => {
    const convertedCard = convertCardDetailToCardData(newCard)

    setColumns((prev) =>
      prev.map((column) =>
        column.id === newCard.columnId
          ? {
              ...column,
              cards: [convertedCard, ...column.cards],
            }
          : column,
      ),
    )

    setIsCreateModalOpen(false)
    setSelectedColumnId(null)
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const allCards = columns.flatMap((c) => c.cards)
    const card = allCards.find((c) => c.id === active.id)
    if (card) {
      setActiveCardData(card)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveCardData(null) // 드래그 종료 시 오버레이 해제

    if (!over) return

    const cardId = active.id as number
    const targetId = over.id as number

    setColumns((prevCols) => {
      // 1. 기존 위치 파악하기 (위에서 아래로 드래그하는 경우인지 판별용)
      let sourceColOriginal = -1
      let sourceCardOriginal = -1
      let targetColOriginal = -1
      let targetCardOriginal = -1

      prevCols.forEach((col, cIdx) => {
        const sIdx = col.cards.findIndex((c) => c.id === cardId)
        const tIdx = col.cards.findIndex((c) => c.id === targetId)
        if (sIdx !== -1) {
          sourceColOriginal = cIdx
          sourceCardOriginal = sIdx
        }
        if (tIdx !== -1) {
          targetColOriginal = cIdx
          targetCardOriginal = tIdx
        }
      })

      const isTopToBottom =
        sourceColOriginal === targetColOriginal &&
        sourceCardOriginal !== -1 &&
        targetCardOriginal !== -1 &&
        sourceCardOriginal < targetCardOriginal

      let movedCard: CardData | null = null

      // 2. 기존 컬럼에서 드래그된 카드를 찾고 제거함 (깊은 복사)
      const newCols = prevCols.map((col) => {
        const cardIndex = col.cards.findIndex((c) => c.id === cardId)
        if (cardIndex !== -1) {
          movedCard = col.cards[cardIndex]
          return {
            ...col,
            cards: col.cards.filter((c) => c.id !== cardId),
          }
        }
        return { ...col, cards: [...col.cards] }
      })

      if (!movedCard) return prevCols

      // 3. 타겟 위치 찾기 및 끼워넣기
      // 케이스 A: 컬럼 위(빈 공간)에 떨어뜨린 경우 -> 맨 아래에 추가
      const targetColIndex = newCols.findIndex((col) => col.id === targetId)
      if (targetColIndex !== -1) {
        newCols[targetColIndex].cards.push(movedCard)
        return newCols
      }

      // 케이스 B: 특정 다른 "카드 위"에 떨어뜨린 경우
      for (let i = 0; i < newCols.length; i++) {
        const dropIndex = newCols[i].cards.findIndex((c) => c.id === targetId)
        if (dropIndex !== -1) {
          // 위에서 아래로 당기는 거면 목표 카드의 '다음' 인덱스에 삽입해야 순서가 바뀜
          const insertIndex = dropIndex + (isTopToBottom ? 1 : 0)
          newCols[i].cards.splice(insertIndex, 0, movedCard) // 끼워넣기
          return newCols
        }
      }

      return prevCols
    })
  }

  const handleDragCancel = () => {
    setActiveCardData(null)
  }

  const handleAddColumn = (title: string) => {
    const newColumn: ColumnData = {
      id: Date.now(),
      title,
      cards: [],
    }
    setColumns((prev) => [...prev, newColumn])
  }

  const handleTaskClick = (task: CardData, columnTitle: string) => {
    setSelectedTask(task)
    setSelectedTaskColumnTitle(columnTitle)
  }

  return (
    <div className="bg-bg flex min-h-screen w-full flex-col text-gray-100">
      <h1 className="text-3xl-32-bold px-12 pt-6 pb-1 leading-19">
        {dashboardTitle}
      </h1>

      {/* 컬럼 가로 */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="flex flex-1 gap-5 overflow-x-auto px-12 pb-10">
          {columns.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              onAddCard={() => {
                setSelectedColumnId(column.id)
                setIsCreateModalOpen(true)
              }}
            >
              {column.cards.map((card) => (
                <Card
                  key={card.id}
                  id={card.id}
                  title={card.title}
                  tags={card.tags}
                  dueDate={card.dueDate}
                  assigneeName={card.assigneeName}
                  hasImage={card.hasImage}
                  onClick={() => handleTaskClick(card, column.title)}
                />
              ))}
            </Column>
          ))}

          {/* TODO: 새로운 컬럼 추가 버튼 영역 */}
          <AddColumnButton
            onAddColumn={handleAddColumn}
            canAddMore={columns.length < 20}
          />
        </div>

        {/* 최상위에서 그려지는 오버레이 (스크롤 이슈 방지) */}
        <DragOverlay>
          {activeCardData ? (
            <Card
              id={activeCardData.id}
              title={activeCardData.title}
              tags={activeCardData.tags}
              dueDate={activeCardData.dueDate}
              assigneeName={activeCardData.assigneeName}
              hasImage={activeCardData.hasImage}
              isOverlay={true}
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* 태스크 상세 모달 */}
      {selectedTask && (
        <TaskDetailModal
          cardId={selectedTask.id}
          dashboardId={dashboardId}
          columnTitle={selectedTaskColumnTitle}
          onClose={() => setSelectedTask(null)}
        />
      )}

      {/* 태크스 생성 모달 */}
      {isCreateModalOpen && selectedColumnId !== null && (
        <TaskCreateModal
          dashboardId={dashboardId}
          columnId={selectedColumnId}
          onClose={() => {
            setIsCreateModalOpen(false)
            setSelectedColumnId(null)
          }}
          onCreate={handleCreateCard}
        />
      )}
    </div>
  )
}

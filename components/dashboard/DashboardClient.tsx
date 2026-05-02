'use client'

import React, { useState, useEffect, useMemo } from 'react'
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
import { createColumn } from '@/libs/api/column/createColumn'
import { updateColumn } from '@/libs/api/column/updateColumn'
import { deleteColumn } from '@/libs/api/column/deleteColumn'
import { updateCard } from '@/libs/api/card/updateCard'
import {
  Member,
  Column as ServerColumn,
  Card as ServerCard,
} from '@/libs/types/Dashboard'
import { deleteCard } from '@/libs/api/cards/deleteCard'
import DeleteConfirmModal from './deleteConfirmModal'
import ColumnEditModal from './ColumnEditModal'

export interface ServerColumnWithCards extends ServerColumn {
  serverCards: ServerCard[]
}

interface DashboardClientProps {
  dashboardId: number
  dashboardTitle: string
  members: Member[]
  initialServerColumns: ServerColumnWithCards[]
}

type CardData = {
  id: string
  title: string
  tags?: string[]
  dueDate?: string
  assigneeName?: string
  assigneeProfileImageUrl?: string | null
  imageUrl?: string | null
  hasImage?: boolean
}

type ColumnData = {
  id: string
  title: string
  cards: CardData[]
}

export default function DashboardClient({
  dashboardId,
  dashboardTitle,
  members,
  initialServerColumns,
}: DashboardClientProps) {
  const convertedColumns: ColumnData[] = useMemo(() => {
    return initialServerColumns.map((col) => ({
      id: String(col.id),
      title: col.title,
      cards: col.serverCards
        ? col.serverCards.map((card) => ({
            id: String(card.id),
            title: card.title,
            tags: card.tags,
            dueDate: card.dueDate ?? undefined,
            assigneeName: card.assignee?.nickname,
            assigneeProfileImageUrl: card.assignee?.profileImageUrl,
            imageUrl: card.imageUrl,
            hasImage: !!card.imageUrl,
          }))
        : [],
    }))
  }, [initialServerColumns])

  const [columns, setColumns] = useState<ColumnData[]>(convertedColumns)
  const [activeCardData, setActiveCardData] = useState<CardData | null>(null)
  const [selectedTask, setSelectedTask] = useState<CardData | null>(null)
  const [selectedTaskColumnTitle, setSelectedTaskColumnTitle] =
    useState<string>('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [activeColumnId, setActiveColumnId] = useState<number>(0)
  const [activeColumnStringId, setActiveColumnStringId] = useState<string>('')
  const [deleteTargetCardId, setDeleteTargetCardId] = useState<number | null>(
    null,
  )
  const [editTargetColumnId, setEditTargetColumnId] = useState<string | null>(
    null,
  )
  const [deleteTargetColumnId, setDeleteTargetColumnId] = useState<
    string | null
  >(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  )

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
    setActiveCardData(null)

    if (!over) return

    const cardId = active.id as string
    const targetId = over.id as string

    let targetColumnId: string | null = null
    const isTargetColumn = columns.some((col) => col.id === targetId)
    if (isTargetColumn) {
      targetColumnId = targetId
    } else {
      for (const col of columns) {
        if (col.cards.some((c) => c.id === targetId)) {
          targetColumnId = col.id
          break
        }
      }
    }

    if (targetColumnId) {
      updateCard(Number(cardId), { columnId: Number(targetColumnId) }).catch(
        (err) => console.error('카드 이동 실패:', err),
      )
    }

    setColumns((prevCols) => {
      let sourceColOriginal = -1
      let sourceCardOriginal = -1
      let targetColOriginal = -1
      let targetCardOriginal = -1

      prevCols.forEach((col, cIdx) => {
        const sIdx = col.cards.findIndex((c) => c.id === cardId)
        if (sIdx !== -1) {
          sourceColOriginal = cIdx
          sourceCardOriginal = sIdx
        }
        const tIdx = col.cards.findIndex((c) => c.id === targetId)
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

      const targetColIndex = newCols.findIndex((col) => col.id === targetId)
      if (targetColIndex !== -1) {
        newCols[targetColIndex].cards.push(movedCard)
        return newCols
      }

      for (let i = 0; i < newCols.length; i++) {
        const dropIndex = newCols[i].cards.findIndex((c) => c.id === targetId)
        if (dropIndex !== -1) {
          const insertIndex = dropIndex + (isTopToBottom ? 1 : 0)
          newCols[i].cards.splice(insertIndex, 0, movedCard)
          return newCols
        }
      }

      return prevCols
    })
  }

  const handleDragCancel = () => {
    setActiveCardData(null)
  }

  const handleAddColumn = async (title: string) => {
    const result = await createColumn({ title, dashboardId })
    if (result.success && result.data) {
      const newColumn = {
        id: String(result.data.id),
        title: result.data.title,
        cards: [],
      }
      setColumns((prev) => [...prev, newColumn])
    } else {
      alert(result.error || '컬럼 생성에 실패했습니다.')
    }
  }

  const handleTaskClick = (task: CardData, columnTitle: string) => {
    setSelectedTask(task)
    setSelectedTaskColumnTitle(columnTitle)
  }

  const handleCardCreated = (card: import('@/libs/types/Dashboard').Card) => {
    const newCard: CardData = {
      id: String(card.id),
      title: card.title,
      tags: card.tags,
      dueDate: card.dueDate ?? undefined,
      assigneeName: card.assignee?.nickname,
      assigneeProfileImageUrl: card.assignee?.profileImageUrl,
      imageUrl: card.imageUrl,
      hasImage: !!card.imageUrl,
    }
    setColumns((prev) =>
      prev.map((col) =>
        col.id === activeColumnStringId
          ? { ...col, cards: [...col.cards, newCard] }
          : col,
      ),
    )
  }

  const handleEditColumnConfirm = async (title: string) => {
    if (!editTargetColumnId) return
    const result = await updateColumn(Number(editTargetColumnId), { title })
    if (result.success && result.data) {
      const newTitle = result.data.title
      setColumns((prev) =>
        prev.map((col) =>
          col.id === editTargetColumnId ? { ...col, title: newTitle } : col,
        ),
      )
    } else {
      alert(result.error || '컬럼 수정에 실패했습니다.')
    }
  }

  const handleDeleteColumnConfirm = async () => {
    if (!deleteTargetColumnId) return
    const result = await deleteColumn(Number(deleteTargetColumnId))
    if (result.success) {
      setColumns((prev) =>
        prev.filter((col) => col.id !== deleteTargetColumnId),
      )
      setDeleteTargetColumnId(null)
    } else {
      alert(result.error || '컬럼 삭제에 실패했습니다.')
    }
  }

  const handleRequestDeleteCard = (cardId: number) => {
    setDeleteTargetCardId(cardId)
  }

  const handleDeleteCard = async () => {
    if (!deleteTargetCardId) return

    try {
      await deleteCard(deleteTargetCardId)

      setColumns((prev) =>
        prev.map((col) => ({
          ...col,
          cards: col.cards.filter(
            (card) => card.id !== String(deleteTargetCardId),
          ),
        })),
      )

      setDeleteTargetCardId(null)
    } catch (err) {
      console.error(err)
      alert('카드 삭제에 실패했습니다')
    }
  }

  return (
    <div className="bg-bg flex min-h-full w-full flex-col text-gray-100">
      <h1 className="text-3xl-32-bold px-12 pt-6 pb-1 leading-19">
        {dashboardTitle}
      </h1>

      <DndContext
        id="dashboard-dnd-context"
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 pb-10 md:px-8 lg:flex-row lg:overflow-x-auto lg:px-12">
          {columns.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              cardCount={column.cards.length}
              onAddCard={() => {
                setActiveColumnId(Number(column.id))
                setActiveColumnStringId(column.id)
                setIsCreateModalOpen(true)
              }}
              onEditClick={() => setEditTargetColumnId(column.id)}
              onDeleteClick={() => setDeleteTargetColumnId(column.id)}
            >
              {column.cards.map((card) => (
                <Card
                  key={card.id}
                  id={card.id}
                  title={card.title}
                  tags={card.tags}
                  dueDate={card.dueDate}
                  assigneeName={card.assigneeName}
                  assigneeProfileImageUrl={card.assigneeProfileImageUrl}
                  imageUrl={card.imageUrl}
                  hasImage={card.hasImage}
                  onClick={() => handleTaskClick(card, column.title)}
                />
              ))}
            </Column>
          ))}

          <AddColumnButton
            onAddColumn={handleAddColumn}
            canAddMore={columns.length < 20}
          />
        </div>

        <DragOverlay>
          {activeCardData ? (
            <Card
              id={activeCardData.id}
              title={activeCardData.title}
              tags={activeCardData.tags}
              dueDate={activeCardData.dueDate}
              assigneeName={activeCardData.assigneeName}
              assigneeProfileImageUrl={activeCardData.assigneeProfileImageUrl}
              imageUrl={activeCardData.imageUrl}
              hasImage={activeCardData.hasImage}
              isOverlay={true}
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      {selectedTask && (
        <TaskDetailModal
          cardId={Number(selectedTask.id)}
          dashboardId={dashboardId}
          columnTitle={selectedTaskColumnTitle}
          columns={columns}
          members={members}
          onClose={() => setSelectedTask(null)}
          onRequestDelete={handleRequestDeleteCard}
        />
      )}

      {isCreateModalOpen && (
        <TaskCreateModal
          onClose={() => setIsCreateModalOpen(false)}
          dashboardId={dashboardId}
          columnId={activeColumnId}
          members={members}
          onCardCreated={handleCardCreated}
        />
      )}

      <DeleteConfirmModal
        isOpen={deleteTargetCardId !== null}
        variant="card"
        onCancel={() => setDeleteTargetCardId(null)}
        onDelete={handleDeleteCard}
      />

      {editTargetColumnId !== null && (
        <ColumnEditModal
          initialTitle={
            columns.find((col) => col.id === editTargetColumnId)?.title || ''
          }
          onClose={() => setEditTargetColumnId(null)}
          onConfirm={handleEditColumnConfirm}
        />
      )}

      <DeleteConfirmModal
        isOpen={deleteTargetColumnId !== null}
        variant="column"
        onCancel={() => setDeleteTargetColumnId(null)}
        onDelete={handleDeleteColumnConfirm}
      />
    </div>
  )
}

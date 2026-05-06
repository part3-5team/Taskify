'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import ModalLayout from '@/components/common/modal/ModalLayout'
import IconMore from '@/assets/icons/ic_more.svg'
import IconX from '@/assets/icons/ic_X.svg'
import DefaultProfileImg from '@/assets/imgs/img_default_profile.svg'
import PopdoverMenu from '@/components/common/PopdoverMenu'
import CommentInput from '@/components/common/comment'
import TaskEditModal from './TaskEditModal'
import { getCardDetail } from '@/libs/api/cards/getCardDetail'
import type { CardDetail } from '@/libs/types/Card'
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from '@/libs/api/comment'
import type { CommentData } from '@/libs/types/Comment'
import { getMyInfo } from '@/libs/api/user'
import type { Member } from '@/libs/types/Dashboard'

type EditColumn = {
  id: string
  title: string
}

type MyInfo = {
  id: number
  email: string
  nickname: string
  profileImageUrl?: string | null
  createdAt: string
  updatedAt: string
}

interface TaskDetailModalProps {
  cardId: number
  dashboardId: number
  columnTitle: string
  columns: EditColumn[]
  members: Member[]
  onClose: () => void
  onRequestDelete?: (cardId: number) => void
  isDashboardOwnder?: boolean
}

export default function TaskDetailModal({
  cardId,
  columnTitle,
  dashboardId,
  columns,
  members,
  onClose,
  onRequestDelete,
  isDashboardOwnder,
}: TaskDetailModalProps) {
  const [card, setCard] = useState<CardDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [myInfo, setMyInfo] = useState<MyInfo | null>(null)
  const [comments, setComments] = useState<CommentData[]>([])
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null)
  const [editingContent, setEditingContent] = useState('')

  const [cursorId, setCursorId] = useState<number | null>(null)
  const [hasMoreComments, setHasMoreComments] = useState(true)
  const [isCommentLoading, setIsCommentLoading] = useState(false)

  const observerRef = useRef<IntersectionObserver | null>(null)

  const [showMenu, setShowMenu] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const data = await getMyInfo()
        setMyInfo(data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchMyInfo()
  }, [])

  useEffect(() => {
    const fetchCardDetail = async () => {
      try {
        setIsLoading(true)

        const data = await getCardDetail(cardId)
        setCard(data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCardDetail()
  }, [cardId])

  const fetchMoreComments = useCallback(async () => {
    if (isCommentLoading || !hasMoreComments || cursorId === null) return

    try {
      setIsCommentLoading(true)

      const data = await getComments({
        cardId,
        cursorId,
        size: 10,
      })

      setComments((prev) => [...prev, ...data.comments])
      setCursorId(data.cursorId)
      setHasMoreComments(data.cursorId !== null)
    } catch (err) {
      console.error(err)
    } finally {
      setIsCommentLoading(false)
    }
  }, [cardId, cursorId, hasMoreComments, isCommentLoading])

  useEffect(() => {
    let ignore = false

    const fetchInitialComments = async () => {
      try {
        setIsCommentLoading(true)

        const data = await getComments({
          cardId,
          size: 10,
        })

        if (ignore) return

        setComments(data.comments)
        setCursorId(data.cursorId)
        setHasMoreComments(data.cursorId !== null)
      } catch (err) {
        console.error(err)
      } finally {
        if (!ignore) {
          setIsCommentLoading(false)
        }
      }
    }

    fetchInitialComments()

    return () => {
      ignore = true
    }
  }, [cardId])

  const lastCommentRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isCommentLoading) return

      if (observerRef.current) {
        observerRef.current.disconnect()
      }

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreComments) {
          fetchMoreComments()
        }
      })

      if (node) {
        observerRef.current.observe(node)
      }
    },
    [fetchMoreComments, hasMoreComments, isCommentLoading],
  )

  const getTagColor = (tag: string) => {
    if (tag === '프로젝트') return 'bg-profile-blue text-white'
    if (tag === '일정') return 'bg-profile-yellow text-white'
    if (tag === '공부') return 'bg-profile-cyan text-white'
    if (tag === '버그') return 'bg-red-500 text-white'

    return 'bg-brand-500 text-white'
  }

  const handleCreateComment = async (value: string) => {
    if (!card) return

    try {
      const newComment = await createComment({
        content: value,
        cardId,
        columnId: card.columnId,
        dashboardId,
      })

      setComments((prev) => [newComment, ...prev])
    } catch (err) {
      console.error(err)
    }
  }

  const handleUpdateComment = async (commentId: number) => {
    try {
      const updatedComment = await updateComment({
        commentId,
        content: editingContent,
      })

      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId ? updatedComment : comment,
        ),
      )

      setEditingCommentId(null)
      setEditingContent('')
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId)

      setComments((prev) => prev.filter((comment) => comment.id !== commentId))
    } catch (err) {
      console.error(err)
    }
  }

  if (isLoading) {
    return (
      <ModalLayout onClose={onClose}>
        <div className="p-10 text-center text-gray-400">로딩중...</div>
      </ModalLayout>
    )
  }

  if (!card) return null

  const tags: string[] = card.tags

  return (
    <>
      <ModalLayout
        onClose={onClose}
        className="flex h-dvh w-screen max-w-none flex-col overflow-hidden rounded-none text-left md:h-auto md:max-h-[90vh] md:w-full md:max-w-[730px] md:flex-row md:rounded-2xl"
      >
        <div className="flex-1 overflow-y-auto p-5 md:p-7.5">
          <div className="mb-4 flex items-start justify-between">
            <h2 className="text-2xl-24-bold text-gray-100">{card.title}</h2>

            <div className="flex gap-2 md:hidden">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-100"
                >
                  <IconMore className="h-4 w-4" />
                </button>

                {showMenu && (
                  <div className="absolute top-full right-0 z-10 mt-1">
                    <PopdoverMenu
                      onClose={() => setShowMenu(false)}
                      onEditClick={() => {
                        setShowMenu(false)
                        setIsEditModalOpen(true)
                      }}
                      onDeleteClick={() => {
                        setShowMenu(false)
                        onRequestDelete?.(cardId)
                        onClose()
                      }}
                    />
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-100"
              >
                <IconX className="h-5 w-5" />
              </button>
            </div>
          </div>

          {tags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-1.5 border-b border-gray-700 pb-6">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-xs-12-medium rounded px-2 py-0.5 ${getTagColor(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mb-6">
            <p className="text-md-15-medium leading-relaxed whitespace-pre-wrap text-gray-300">
              {card.description}
            </p>
          </div>

          {card.imageUrl && (
            <img
              src={card.imageUrl}
              alt="할 일 카드 이미지"
              className="mb-6 h-[260px] w-full rounded-xl object-cover"
            />
          )}

          <div className="mt-6 md:hidden">
            <hr className="mb-6 border-gray-700" />

            <div className="mb-8 grid grid-cols-2 gap-6 lg:grid-cols-3">
              <div>
                <h4 className="mb-2 text-[10px] font-bold text-gray-500 uppercase">
                  담당자
                </h4>

                <div className="flex items-center gap-2">
                  {card.assignee.profileImageUrl ? (
                    <img
                      src={card.assignee.profileImageUrl}
                      alt="담당자 프로필"
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  ) : (
                    <DefaultProfileImg className="h-6 w-6 rounded-full bg-white object-cover" />
                  )}

                  <span className="text-xs-12-medium text-gray-200">
                    {card.assignee.nickname}
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
                  {card.dueDate || '미정'}
                </p>
              </div>
            </div>
          </div>

          <div className="text-lg-16-medium mb-6">
            <CommentInput
              profileName={myInfo?.nickname}
              profileImageUrl={myInfo?.profileImageUrl}
              onSubmit={handleCreateComment}
            />
          </div>

          <div className="max-h-[200px] space-y-4 overflow-y-auto pr-2">
            {comments.map((comment, idx) => {
              const isEditing = editingCommentId === comment.id
              const isLastComment = idx === comments.length - 1
              const isMyComment = myInfo?.id === comment.author.id
              const canEditComment = isMyComment
              const canDeleteComment = isMyComment || isDashboardOwnder

              return (
                <div
                  key={comment.id}
                  ref={isLastComment ? lastCommentRef : null}
                  className="flex gap-3"
                >
                  {comment.author.profileImageUrl ? (
                    <img
                      src={comment.author.profileImageUrl}
                      alt="댓글 작성자 프로필"
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  ) : (
                    <DefaultProfileImg className="h-6 w-6 rounded-full bg-white object-cover" />
                  )}

                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs-12-semibold text-gray-100">
                          {comment.author.nickname}
                        </span>

                        <span className="text-[10px] text-gray-600">
                          {new Date(comment.createdAt).toLocaleString()}
                        </span>
                      </div>

                      {(canEditComment || canDeleteComment) && (
                        <div className="flex gap-2 text-[10px] text-gray-600">
                          {canEditComment && (
                            <button
                              type="button"
                              className="hover:underline"
                              onClick={() => {
                                setEditingCommentId(comment.id)
                                setEditingContent(comment.content)
                              }}
                            >
                              수정
                            </button>
                          )}

                          {canDeleteComment && (
                            <button
                              type="button"
                              className="hover:underline"
                              onClick={() => handleDeleteComment(comment.id)}
                            >
                              삭제
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {isEditing ? (
                      <div className="flex gap-2">
                        <input
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                          className="bg-black-400 flex-1 rounded border border-gray-700 px-3 py-2 text-sm text-gray-100 outline-none"
                        />

                        <button
                          type="button"
                          onClick={() => handleUpdateComment(comment.id)}
                          className="text-xs-12-semibold text-brand-500"
                        >
                          저장
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setEditingCommentId(null)
                            setEditingContent('')
                          }}
                          className="text-xs-12-semibold text-gray-500"
                        >
                          취소
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm-13-medium text-gray-200">
                        {comment.content}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {isCommentLoading && (
            <div className="text-xs-12-medium py-4 text-center text-gray-500">
              댓글 불러오는 중...
            </div>
          )}
        </div>

        <div className="hidden w-[180px] border-l border-gray-700 p-5 md:block">
          <div className="mb-6 flex justify-end gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowMenu(!showMenu)}
                className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-100"
              >
                <IconMore className="h-4 w-4" />
              </button>

              {showMenu && (
                <div className="absolute top-full right-0 z-10 mt-1">
                  <PopdoverMenu
                    onClose={() => setShowMenu(false)}
                    onEditClick={() => {
                      setShowMenu(false)
                      setIsEditModalOpen(true)
                    }}
                    onDeleteClick={() => {
                      setShowMenu(false)
                      onRequestDelete?.(cardId)
                      onClose()
                    }}
                  />
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-100"
            >
              <IconX className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="mb-2 text-[10px] font-bold text-gray-500 uppercase">
                담당자
              </h4>

              <div className="flex items-center gap-2">
                {card.assignee.profileImageUrl ? (
                  <img
                    src={card.assignee.profileImageUrl}
                    alt="담당자 프로필"
                    className="h-6 w-6 rounded-full object-cover"
                  />
                ) : (
                  <DefaultProfileImg className="h-6 w-6 rounded-full bg-white object-cover" />
                )}

                <span className="text-xs-12-medium text-gray-200">
                  {card.assignee.nickname}
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
                {card.dueDate || '미정'}
              </p>
            </div>
          </div>
        </div>
      </ModalLayout>

      {isEditModalOpen && card && (
        <TaskEditModal
          card={card}
          dashboardId={dashboardId}
          columns={columns}
          members={members}
          onClose={() => setIsEditModalOpen(false)}
          onEdited={(updateCard) => {
            setCard(updateCard)
            setIsEditModalOpen(false)
          }}
        />
      )}
    </>
  )
}

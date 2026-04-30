'use server'

import { cookies } from 'next/headers'
import type { CommentData, CommentListResponse } from '@/libs/types/Comment'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

const getAuthHeaders = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  return {
    'Content-Type': 'application/json',
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  }
}

export const getComments = async ({
  cardId,
  size = 10,
  cursorId,
}: {
  cardId: number
  size?: number
  cursorId?: number | null
}): Promise<CommentListResponse> => {
  const params = new URLSearchParams({
    cardId: String(cardId),
    size: String(size),
  })

  if (cursorId) {
    params.append('cursorId', String(cursorId))
  }

  const response = await fetch(`${BASE_URL}/comments?${params.toString()}`, {
    method: 'GET',
    headers: await getAuthHeaders(),
    cache: 'no-store',
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || '댓글 목록 조회에 실패했습니다.')
  }

  return data
}

export const createComment = async ({
  content,
  cardId,
  columnId,
  dashboardId,
}: {
  content: string
  cardId: number
  columnId: number
  dashboardId: number
}): Promise<CommentData> => {
  const response = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: await getAuthHeaders(),
    body: JSON.stringify({
      content,
      cardId,
      columnId,
      dashboardId,
    }),
    cache: 'no-store',
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || '댓글 생성에 실패했습니다.')
  }

  return data
}

export const updateComment = async ({
  commentId,
  content,
}: {
  commentId: number
  content: string
}): Promise<CommentData> => {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'PUT',
    headers: await getAuthHeaders(),
    body: JSON.stringify({ content }),
    cache: 'no-store',
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || '댓글 수정에 실패했습니다.')
  }

  return data
}

export const deleteComment = async (commentId: number) => {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
    headers: await getAuthHeaders(),
    cache: 'no-store',
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.message || '댓글 삭제에 실패했습니다.')
  }
}

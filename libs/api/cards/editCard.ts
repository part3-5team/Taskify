'use server'

import { cookies } from 'next/headers'
import type { CardDetail } from '@/libs/types/Card'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

interface EditCardParams {
  cardId: number
  columnId: number
  assigneeUserId?: number | null
  title: string
  description: string
  dueDate?: string | null
  tags: string[]
  imageUrl?: string | null
}

export const editCard = async ({
  cardId,
  columnId,
  assigneeUserId,
  title,
  description,
  dueDate,
  tags,
  imageUrl,
}: EditCardParams): Promise<CardDetail> => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) {
    throw new Error('로그인이 필요합니다.')
  }

  const res = await fetch(`${BASE_URL}/cards/${cardId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      columnId,
      assigneeUserId,
      title,
      description,
      dueDate,
      tags,
      imageUrl,
    }),
    cache: 'no-store',
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || '카드 수정에 실패했습니다.')
  }

  return data
}
